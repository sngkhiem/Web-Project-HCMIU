package com.example.hcmiuweb.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Recipient of the notification

    @Column(nullable = false)
    private String type; // e.g., "NEW_VIDEO", "NEW_COMMENT"

    @Column(nullable = false)
    private String message;

    @ManyToOne
    @JoinColumn(name = "related_video_id")
    private Video relatedVideo; // Optional: may be null

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private boolean isRead;

    // Constructors
    public Notification() {}

    public Notification(User user, String type, String message, Video relatedVideo, LocalDateTime createdAt, boolean isRead) {
        this.user = user;
        this.type = type;
        this.message = message;
        this.relatedVideo = relatedVideo;
        this.createdAt = createdAt;
        this.isRead = isRead;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }

    public Video getRelatedVideo() {
        return relatedVideo;
    }
    public void setRelatedVideo(Video relatedVideo) {
        this.relatedVideo = relatedVideo;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean isRead() {
        return isRead;
    }
    public void setRead(boolean isRead) {
        this.isRead = isRead;
    }
}
