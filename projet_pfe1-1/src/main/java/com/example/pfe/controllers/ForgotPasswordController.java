package com.example.pfe.controllers;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pfe.models.ChangePassword;
import com.example.pfe.models.ForgotPassword;
import com.example.pfe.models.User;
import com.example.pfe.payload.request.MailBody;
import com.example.pfe.repository.ForgotPasswordRepository;
import com.example.pfe.repository.UserRepository;
import com.example.pfe.security.services.EmailService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/forgotPassword")
public class ForgotPasswordController {
	private final UserRepository userRepository;
	private final EmailService emailService;
	private final ForgotPasswordRepository forgotPasswordRepository;
	private final PasswordEncoder passwordEncoder;

	public ForgotPasswordController(UserRepository userRepository, EmailService emailService,
	        ForgotPasswordRepository forgotPasswordRepository, PasswordEncoder passwordEncoder) {
	    super();
	    this.userRepository = userRepository;
	    this.emailService = emailService;
	    this.forgotPasswordRepository = forgotPasswordRepository;
	    this.passwordEncoder = passwordEncoder;
	}
	   @PostMapping("/verifyMail/{email}")
	    public ResponseEntity<String> verifyEmail(@PathVariable String email) {
	        User user = userRepository.findByEmail(email)
	                .orElseThrow(() -> new UsernameNotFoundException("Please provide a valid email!"));
	        int otp = otpGenerator();
	        MailBody mailBody = MailBody.builder()
	                .to(email)
	                .text("This is the OTP for your Forgot Password request: <a href='http://localhost:4200/auth/reset_password/" + otp + "'>Reset Password</a>")
	                .subject("For Forgot Password")
	                .build();

	        ForgotPassword fp = ForgotPassword.builder().otp(otp)
	        		.expirationTime(new Date(System.currentTimeMillis() + 3 * 60 * 1000))
	                .user(user)
	                .build();

	        emailService.sendSimpleMessage(mailBody);
	        forgotPasswordRepository.save(fp);

	        HttpHeaders headers = new HttpHeaders();
	        headers.setContentType(MediaType.TEXT_HTML);
	        return ResponseEntity.ok()
	                .headers(headers)
	                .body("Email sent for verification! Please check your email for the password reset link.");
	    }


@PostMapping("/verifyotp/{otp}/{email}")
public ResponseEntity<String> verify0tp(@PathVariable Integer otp, @PathVariable String email) { 
	User user = userRepository.findByEmail(email)
.orElseThrow(() -> new UsernameNotFoundException("Please provide an valid email!"));
	ForgotPassword fp =forgotPasswordRepository.findByOtpAndUser(otp, user) 
			.orElseThrow(() -> new RuntimeException("Invalid OTP for email:"+email));
	if (fp.getExpirationTime().before (Date.from(Instant.now()))) {
	
	forgotPasswordRepository.deleteById(fp.getFpid());
	return new ResponseEntity<> ( "OTP has expired!", HttpStatus.EXPECTATION_FAILED);
	}
	return ResponseEntity.ok("OTP Verified");
}

 @PostMapping("/changePassword/{otp}")
 public ResponseEntity<String> changePasswordHandler (@RequestBody ChangePassword changePassword, @PathVariable int otp) {
if (!Objects.equals (changePassword.password(), changePassword.repeatPassword())) {
	return new ResponseEntity<>( "Please enter the password again!", HttpStatus.EXPECTATION_FAILED);

}
String encodedPassword = passwordEncoder.encode(changePassword.password());
String email=getEmailByOTP(otp);
userRepository.updatePassword(email, encodedPassword);
return ResponseEntity.ok(  "Password has been changed!");
}
 
	
	private Integer otpGenerator() {
	
	Random random = new Random();
	return random.nextInt( 100_000, 999_999) ;
	}
	public String getEmailByOTP(@PathVariable int otp) {
        ForgotPassword fp = forgotPasswordRepository.findByOtp(otp)
                .orElseThrow(() -> new UsernameNotFoundException("Invalid OTP!"));

        return fp.getUser().getEmail();
    }
}

