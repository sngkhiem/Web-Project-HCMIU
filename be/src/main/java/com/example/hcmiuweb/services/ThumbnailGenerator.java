package com.example.hcmiuweb.services;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

/**
 * ThumbnailGenerator: finds the highest-motion segment head and tail within a single scene.
 * Avoids windows that cross detected scene transitions by ignoring windows containing cuts.
 * Generates a smooth, color GIF using FFmpeg palette optimization.
 */
public class ThumbnailGenerator {
    // preview segment length in seconds
    private static final int SEGMENT_LENGTH_SECONDS = 4;
    // frames per second for motion analysis
    private static final int SAMPLE_RATE = 1;
    // frames per second for GIF output (higher to reduce lag)
    private static final int GIF_FPS = 30;
    // threshold for frame diff indicating a scene cut
    private static final double SCENE_CUT_THRESHOLD = 1e5;

    public static class Segment {
        public final int startSec;
        public final int endSec;
        public final double score;
        public final File gifFile;
        public Segment(int startSec, int endSec, double score, File gifFile) {
            this.startSec = startSec;
            this.endSec = endSec;
            this.score = score;
            this.gifFile = gifFile;
        }
        @Override public String toString() {
            return String.format("Segment[%d–%d] score=%.1f gif=%s",
                    startSec, endSec, score, gifFile.getName());
        }
    }

    /**
     * Generates a GIF preview of the highest-motion segment that does not cross a scene transition.
     */
    public static Segment generateThumbnail(File inputFile, File outputDir) throws Exception {
        // 1. extract grayscale frames for analysis
        Path tmpDir = Files.createTempDirectory("frames_");
        String framePattern = tmpDir.resolve("frame_%05d.png").toString();
        new ProcessBuilder(
                "ffmpeg", "-i", inputFile.getAbsolutePath(),
                "-vf", "format=gray,fps=" + SAMPLE_RATE,
                framePattern
        ).inheritIO().start().waitFor();

        // load frames and compute diffs
        File[] frames = tmpDir.toFile().listFiles((d, n) -> n.endsWith(".png"));
        Arrays.sort(frames);
        int n = frames.length;
        double[] diff = new double[n];
        Set<Integer> cutIndices = new HashSet<>();
        BufferedImage prev = null;
        for (int i = 0; i < n; i++) {
            BufferedImage curr = ImageIO.read(frames[i]);
            if (prev != null) {
                double d = frameDiff(prev, curr);
                diff[i] = d;
                if (d > SCENE_CUT_THRESHOLD) {
                    cutIndices.add(i);
                }
            }
            prev = curr;
        }
        // cleanup temp frames
        for (File f : frames) f.delete();
        tmpDir.toFile().delete();

        // prefix sums
        double[] ps = new double[n + 1];
        for (int i = 1; i <= n; i++) ps[i] = ps[i - 1] + diff[i - 1];

        // sliding window skipping those with cuts
        int window = SEGMENT_LENGTH_SECONDS * SAMPLE_RATE;
        double bestScore = -1;
        int bestStart = 0;
        outer: for (int start = 0; start + window <= n; start++) {
            // skip if any cut index inside (start+1 .. start+window-1)
            for (int cut : cutIndices) {
                if (cut > start && cut < start + window) {
                    continue outer;
                }
            }
            double score = ps[start + window] - ps[start];
            if (score > bestScore) {
                bestScore = score;
                bestStart = start;
            }
        }
        int head = bestStart;
        int tail = head + SEGMENT_LENGTH_SECONDS;

        // generate optimized GIF
        File palette = new File(outputDir, "palette.png");
        File gif = new File(outputDir, String.format("preview_%d_%d.gif", head, tail));

        new ProcessBuilder(
                "ffmpeg",
                "-ss", String.valueOf(head),
                "-to", String.valueOf(tail),
                "-i", inputFile.getAbsolutePath(),
                "-vf", String.format("fps=%d,scale=320:-1:flags=lanczos,palettegen", GIF_FPS),
                palette.getAbsolutePath()
        ).inheritIO().start().waitFor();

        new ProcessBuilder(
                "ffmpeg",
                "-ss", String.valueOf(head),
                "-to", String.valueOf(tail),
                "-i", inputFile.getAbsolutePath(),
                "-i", palette.getAbsolutePath(),
                "-lavfi", String.format("fps=%d,scale=320:-1:flags=lanczos[x];[x][1:v]paletteuse", GIF_FPS),
                gif.getAbsolutePath()
        ).inheritIO().start().waitFor();

        palette.delete();
        return new Segment(head, tail, bestScore, gif);
    }

    private static double frameDiff(BufferedImage a, BufferedImage b) {
        int w = a.getWidth(), h = a.getHeight();
        double sum = 0;
        for (int y = 0; y < h; y++) {
            for (int x = 0; x < w; x++) {
                int v1 = a.getRGB(x, y) & 0xFF;
                int v2 = b.getRGB(x, y) & 0xFF;
                sum += Math.abs(v1 - v2);
            }
        }
        return sum;
    }
}