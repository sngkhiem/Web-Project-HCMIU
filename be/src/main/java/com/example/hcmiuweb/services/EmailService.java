package com.example.hcmiuweb.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tinchuanemnhe@gmail.com");
        message.setTo(to);
        message.setSubject("Your Login OTP Code");
        message.setText("Your OTP code is: " + otp + "\n\nThis code will expire in 5 minutes.");
        
        emailSender.send(message);
    }
} 