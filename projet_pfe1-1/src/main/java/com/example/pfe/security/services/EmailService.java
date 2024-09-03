package com.example.pfe.security.services;

import java.io.IOException;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.pfe.payload.request.CalenderDto;
import com.example.pfe.payload.request.MailBody;


@Service
public class EmailService {
	private final JavaMailSender javaMailSender;
	public EmailService (JavaMailSender javaMailSender) { 
		this.javaMailSender = javaMailSender;
	}
	public void sendCalenderInvite(CalenderDto calenderDto) throws IOException {
        // Implémentez le code pour envoyer l'invitation du calendrier
    }

public void sendSimpleMessage (MailBody mailBody) {
	SimpleMailMessage message = new SimpleMailMessage();
	message.setTo(mailBody.to());
	message.setFrom("nom_utilisateur@domaine.com");
	message.setSubject(mailBody.subject());
	message.setText(mailBody.text());
	
	javaMailSender.send(message);
}
	
}
