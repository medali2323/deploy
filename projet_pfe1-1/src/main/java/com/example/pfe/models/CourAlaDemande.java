package com.example.pfe.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity

@DiscriminatorValue("CoursAlaDemande")
public class CourAlaDemande extends Cours{
	private String lienvideo;

	public String getLienvideo() {
		return lienvideo;
	}

	public void setLienvideo(String lienvideo) {
		this.lienvideo = lienvideo;
	}

	
}
