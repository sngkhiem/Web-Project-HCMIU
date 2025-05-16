package com.example.hcmiuweb.controllers;

import com.example.hcmiuweb.payload.request.CommentRequest;
import com.example.hcmiuweb.payload.response.CommentResponse;
import com.example.hcmiuweb.payload.response.MessageResponse;
import com.example.hcmiuweb.services.CommentService;
import com.example.hcmiuweb.services.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    
    private final CommentService commentService;
    
    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }
    
    @PostMapping
    public ResponseEntity<?> addComment(@Valid @RequestBody CommentRequest commentRequest) {
        try {
            // Get the authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long authenticatedUserId = userDetails.getId();
            
            // Check if the userId in the request matches the authenticated user's ID
            if (commentRequest.getUserId() != null && !commentRequest.getUserId().equals(authenticatedUserId)) {
                return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("Error: You can only comment with your own user ID"));
            }
            
            // Set the userId in the request to the authenticated user's ID
            commentRequest.setUserId(authenticatedUserId);
            
            CommentResponse newComment = commentService.addComment(commentRequest);
            return new ResponseEntity<>(newComment, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    @GetMapping
    public ResponseEntity<?> getAllComments() {
        try {
            List<CommentResponse> comments = commentService.getAllComments();
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }

    @GetMapping("/video/{videoId}")
    public ResponseEntity<?> getVideoComments(@PathVariable Long videoId) {
        try {
            List<CommentResponse> comments = commentService.getVideoComments(videoId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getUserComments(@PathVariable Long userId) {
        try {
            List<CommentResponse> comments = commentService.getUserComments(userId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{commentId}")
    public ResponseEntity<?> getCommentById(@PathVariable Long commentId) {
        try {
            CommentResponse comment = commentService.getCommentById(commentId);
            return ResponseEntity.ok(comment);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new MessageResponse("Error: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable Long commentId) {
        try {
            // Get the authenticated user
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long authenticatedUserId = userDetails.getId();
            
            commentService.deleteComment(commentId, authenticatedUserId);
            return ResponseEntity.ok(new MessageResponse("Comment deleted successfully!"));
        } catch (Exception e) {
            if (e.getMessage().contains("Not authorized")) {
                return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("Error: " + e.getMessage()));
            } else if (e.getMessage().contains("not found")) {
                return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new MessageResponse("Error: " + e.getMessage()));
            } else {
                return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse("Error: " + e.getMessage()));
            }
        }
    }
}