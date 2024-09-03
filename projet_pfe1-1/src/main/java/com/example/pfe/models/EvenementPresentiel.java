package com.example.pfe.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@PrimaryKeyJoinColumn(name="id")

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
