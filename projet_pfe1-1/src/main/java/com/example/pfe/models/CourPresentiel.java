package com.example.pfe.models;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;

@Entity

@DiscriminatorValue("Presentiel")
public class CourPresentiel extends Cours{
	private String emplacement;

	public String getEmplacement() {
		return emplacement;
	}

	public void setEmplacement(String emplacement) {
		this.emplacement = emplacement;
	}
	
	
}
