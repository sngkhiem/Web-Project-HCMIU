package com.example.hcmiuweb.payload.response;

public class CommentRatingResponse {
    private long likes;
    private long dislikes;
    
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
