package com.stockmarket.predictor.Service;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMailMessage;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    private JavaMailSender javaMailSender;

    public void sendVerificationEmail(String email, String otp) {
        try {
            MimeMailMessage mimeMessage = new MimeMailMessage(javaMailSender.createMimeMessage());
            mimeMessage.setTo(email);
            mimeMessage.setSubject("Your OTP Code");
            mimeMessage.setText("Your OTP code is: " + otp);
            javaMailSender.send(mimeMessage.getMimeMessage());
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
