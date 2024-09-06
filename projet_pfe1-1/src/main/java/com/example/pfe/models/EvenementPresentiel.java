package com.example.pfe.models;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;


@Entity
@DiscriminatorValue("EvenementPresentiel")

public class EvenementPresentiel extends Evenement {
    private String emplacement;

  
  

    public String getemplacement() {
		return emplacement;
	}

	public void setemplacement(String emplacement) {
		this.emplacement = emplacement;
	}



	
    public EvenementPresentiel(String lienMeet) {
        super();
    }

    public EvenementPresentiel() {
        super();
    }
    
}
