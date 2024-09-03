package com.example.pfe.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.pfe.models.ForgotPassword;
import com.example.pfe.models.User;
public interface ForgotPasswordRepository extends JpaRepository<ForgotPassword, Integer> {
	@Query("select fp from ForgotPassword fp where fp.otp = ?1 and fp.user = ?2")
	Optional<ForgotPassword> findByOtpAndUser (Integer otp, User user);
    Optional<ForgotPassword> findByOtp(int otp);

}