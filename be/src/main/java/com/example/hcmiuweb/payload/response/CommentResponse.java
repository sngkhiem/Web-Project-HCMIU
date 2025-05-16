package com.example.hcmiuweb.payload.response;

import com.example.hcmiuweb.entities.Comment;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class CommentResponse {
    private Long id;
    private String content;
    private LocalDateTime datePosted;
    private Long videoId;
    private Long userId;
    private String username;
    private String userAvatarUrl;
    private Long parentCommentId;
    private long likes;
    private long dislikes;
    private List<CommentResponse> replies = new ArrayList<>();

    public CommentResponse() {
    }    public CommentResponse(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.datePosted = comment.getDatePosted();
        this.videoId = comment.getVideo().getId();
        this.userId = comment.getUser().getId();
        this.username = comment.getUser().getUsername();
        this.userAvatarUrl = comment.getUser().getAvatar(); // Changed from getAvatarUrl() to getAvatar()
        this.likes = comment.getLikesCount();
        this.dislikes = comment.getDislikesCount();
        if (comment.getParentComment() != null) {
            this.parentCommentId = comment.getParentComment().getId();
        }
        
        // Process replies if any
        if (comment.getReplies() != null && !comment.getReplies().isEmpty()) {
            this.replies = comment.getReplies().stream()
                    .map(CommentResponse::new)
                    .collect(Collectors.toList());
        }
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDateTime datePosted) {
        this.datePosted = datePosted;
    }

    public Long getVideoId() {
        return videoId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUserAvatarUrl() {
        return userAvatarUrl;
    }

    public void setUserAvatarUrl(String userAvatarUrl) {
        this.userAvatarUrl = userAvatarUrl;
    }

    public Long getParentCommentId() {
        return parentCommentId;
    }

    public void setParentCommentId(Long parentCommentId) {
        this.parentCommentId = parentCommentId;
    }

    public List<CommentResponse> getReplies() {
        return replies;
    }    public void setReplies(List<CommentResponse> replies) {
        this.replies = replies;
    }
    
    public long getLikes() {
        return likes;
    }
    
    public void setLikes(long likes) {
        this.likes = likes;
    }
    
    public long getDislikes() {
        return dislikes;
    }
    
    public void setDislikes(long dislikes) {
        this.dislikes = dislikes;
    }
}