package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.dtos.VideoDTO;
import com.example.hcmiuweb.entities.Video;
import com.example.hcmiuweb.services.CategoryService;
import com.example.hcmiuweb.services.VideoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://172.18.0.3:5173"})
@RequestMapping("/api/videos")
public class VideoController {

    private final VideoService videoService;
    private final CategoryService categoryService;

    public VideoController(VideoService videoService, CategoryService categoryService) {
        this.videoService = videoService;
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<VideoDTO> getAllVideos() {
        return videoService.findAllVideosWithRatings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoDTO> getVideoById(@PathVariable Long id) {
        return videoService.findVideoByIdWithRating(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/uploader/{uploaderId}")
    public List<VideoDTO> getVideosByUploader(@PathVariable Long uploaderId) {
        return videoService.findVideosByUploaderWithRatings(uploaderId);
    }

    @GetMapping("/category/{categoryId}")
    public List<VideoDTO> getVideosByCategory(@PathVariable Long categoryId) {
        return videoService.findVideosByCategoryWithRatings(categoryId);
    }

    @GetMapping("/search")
    public List<VideoDTO> searchVideos(@RequestParam String title) {
        return videoService.searchVideosByTitleWithRatings(title);
    }

    @PostMapping
    public ResponseEntity<?> createVideo(@RequestBody Video video) {
        try {
            // Set upload date if not provided
            if (video.getUploadDate() == null) {
                video.setUploadDate(LocalDateTime.now());
            }

            // Verify category exists
            if (video.getCategory() == null || video.getCategory().getId() == null) {
                return ResponseEntity.badRequest()
                        .body("Category must be specified");
            }

            // Verify that category exists in database using CategoryService
            if (!categoryService.existsById(video.getCategory().getId())) {
                return ResponseEntity.badRequest()
                        .body("Category with ID " + video.getCategory().getId() + " does not exist");
            }

            // Save video
            Video savedVideo = videoService.createVideo(video);

            // Return the DTO with rating info
            VideoDTO videoDTO = videoService.findVideoByIdWithRating(savedVideo.getId())
                    .orElseThrow(() -> new RuntimeException("Could not retrieve saved video"));

            return ResponseEntity.ok(videoDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error processing video request: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateVideo(@PathVariable Long id, @RequestBody Video video) {
        return videoService.findVideoById(id)
                .map(existingVideo -> {
                    video.setId(id);
                    Video updatedVideo = videoService.updateVideo(video);

                    // Return the DTO with rating info
                    VideoDTO videoDTO = videoService.findVideoByIdWithRating(updatedVideo.getId())
                            .orElseThrow(() -> new RuntimeException("Could not retrieve updated video"));

                    return ResponseEntity.ok(videoDTO);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVideo(@PathVariable Long id) {
        return videoService.findVideoById(id)
                .map(video -> {
                    videoService.deleteVideo(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error processing video request: " + e.getMessage());
    }
}