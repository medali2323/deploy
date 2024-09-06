package com.example.pfe.models;

import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.util.Date;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE", length = 20)
public  class Formation { 
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private Date date;
    private int nbrParticipant;
    private String sujet;
    private double fraisFormation;
    private int nbrPlaceMax;
    private Boolean approuve;

    @ManyToOne  @JoinColumn(name = "Categ_formation_id")  private Categ_formation categ_formation;
    @ManyToOne  @JoinColumn(name = "Instructor_id")  private Instructor instructor;

    @OneToMany(mappedBy = "formation")
    private List<LigneFormation> lignesFormation;
    
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getNbrParticipant() {
        return nbrParticipant;
    }

    public void setNbrParticipant(int nbrParticipant) {
        this.nbrParticipant = nbrParticipant;
    }

    public String getSujet() {
        return sujet;
    }

    public void setSujet(String sujet) {
        this.sujet = sujet;
    }

    public double getFraisFormation() {
        return fraisFormation;
    }

    public void setFraisFormation(double fraisFormation) {
        this.fraisFormation = fraisFormation;
    }

    public int getNbrPlaceMax() {
        return nbrPlaceMax;
    }

    public void setNbrPlaceMax(int nbrPlaceMax) {
        this.nbrPlaceMax = nbrPlaceMax;
    }
    

	public Boolean getApprouve() {
		return approuve;
	}

	public void setApprouve(Boolean approuve) {
		this.approuve = approuve;
	}

	public Categ_formation getCateg_formation() {
		return categ_formation;
	}

	public void setCateg_formation(Categ_formation categ_formation) {
		this.categ_formation = categ_formation;
	}

	public Instructor getInstructor() {
		return instructor;
	}

	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}
	
    
}
