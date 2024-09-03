package com.example.pfe.models;

import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
import java.util.Date;

@Data
@Builder
@Entity
public class ForgotPassword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fpid;

    @Column(nullable = false)
    private Integer otp;

    @Column(nullable = false)
    private Date expirationTime;

    @OneToOne
    private User user;

    // Add default constructor
    public ForgotPassword() {
        // Default constructor
    }
    public ForgotPassword(int fpid, Integer otp, Date expirationTime, User user) {
        this.fpid = fpid;
        this.otp = otp;
        this.expirationTime = expirationTime;
        this.user = user;
    }
    // Getters and setters
}
