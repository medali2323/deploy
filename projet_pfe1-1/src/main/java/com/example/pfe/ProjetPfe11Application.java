package com.example.pfe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.exemple.pfe.utils.GoogleCalendarClient;

@SpringBootApplication
public class ProjetPfe11Application {

	public static void main(String[] args) {
		SpringApplication.run(ProjetPfe11Application.class, args);
	}
	  @Bean
	    public GoogleCalendarClient googleCalendarClient() {
	        return new GoogleCalendarClient(); // Ou configurez votre client ici
	    }
}
