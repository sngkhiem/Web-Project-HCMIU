package com.example.hcmiuweb.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.*;
import java.util.List;
import java.util.Random;

public class ThumbnailGenerator {
    public Path extractThumbnail(String videoPath, int frameCount, String outputDir) throws Exception {
        double duration = getVideoDuration(videoPath);
        Random rand = new Random();

        // Prepare output directory
        Path baseDir = Paths.get(outputDir);
        Files.createDirectories(baseDir);

        Path bestFrame = null;
        long bestSize = -1;

        for (int i = 0; i < frameCount; i++) {
            // 1) pick random timestamp within duration
            double randomSec = rand.nextDouble() * duration;
            String timestamp = String.format("%02d:%02d:%02d",
                    (int)(randomSec / 3600),
                    (int)(randomSec % 3600) / 60,
                    (int)(randomSec % 60)
            );

            // 2) extract a single frame
            Path candidate = baseDir.resolve("frame_" + i + ".jpg");
            List<String> cmd = List.of(
                    "ffmpeg",
                    "-ss", timestamp,
                    "-i", videoPath,
                    "-frames:v", "1",
                    "-q:v", "2",
                    candidate.toString()
            );
            Process p = new ProcessBuilder(cmd)
                    .redirectErrorStream(true)
                    .start();
            p.waitFor();

            // 3) measure its size
            long size = Files.size(candidate);

            // 4) compare against current best
            if (size > bestSize) {
                // new best → delete old best if exists
                if (bestFrame != null) {
                    Files.deleteIfExists(bestFrame);
                }
                bestFrame = candidate;
                bestSize  = size;
            } else {
                // not better → delete candidate immediately
                Files.deleteIfExists(candidate);
            }
        }

        if (bestFrame == null) {
            throw new IllegalStateException("No frames could be extracted.");
        }

        System.out.println("Best thumbnail kept: " + bestFrame);
        return bestFrame;
    }

    private double getVideoDuration(String videoPath) throws IOException, InterruptedException {
        ProcessBuilder pb = new ProcessBuilder(
                "ffprobe",
                "-v", "error",
                "-show_entries", "format=duration",
                "-of", "default=noprint_wrappers=1:nokey=1",
                videoPath
        );
        Process p = pb.start();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(p.getInputStream()))) {
            String line = reader.readLine();
            p.waitFor();
            return Double.parseDouble(line);
        }
    }
}
