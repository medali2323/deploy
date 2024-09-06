package com.example.pfe.models;

import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;

@Entity
@DiscriminatorValue("EvenementEnLigne")

public class EvenementEnLigne extends Evenement {
    private String linkMeet;

   

    // Constructeur avec arguments
    public EvenementEnLigne(String linkMeet) {
        super();
        this.linkMeet = linkMeet;
    }

    // Constructeur vide
    public EvenementEnLigne() {
        super();
    }

    // Getters et setters
    public String getLinkMeet() {
        return linkMeet;
    }

    public void setLinkMeet(String linkMeet) {
        this.linkMeet = linkMeet;
    }

 
}
