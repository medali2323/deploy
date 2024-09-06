package com.example.pfe.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity

@DiscriminatorValue("FormationAlaDemande")
public class FormationAlaDemande extends Formation{
	private String LienVideo;

	public String getLienVideo() {
		return LienVideo;
	}

	public void setLienVideo(String lienVideo) {
		LienVideo = lienVideo;
	}
	
}
