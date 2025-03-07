package com.example.hcmiuweb.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "VideoRating")
public class VideoRating {
    @EmbeddedId
    private VideoRatingId id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @MapsId("videoId")
    @JoinColumn(name = "video_id", nullable = false)
    private Video video;

    @Column(nullable = false)
    private int rating; // +1 for like, -1 for dislike

    // Constructors
    public VideoRating() {}

    public VideoRating(User user, Video video, int rating) {
        this.user = user;
        this.video = video;
        this.rating = rating;
        this.id = new VideoRatingId(user.getId(), video.getId());
    }

    // Getters & Setters
    public VideoRatingId getId() {
        return id;
    }
    public void setId(VideoRatingId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public Video getVideo() {
        return video;
    }
    public void setVideo(Video video) {
        this.video = video;
    }

    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
}
