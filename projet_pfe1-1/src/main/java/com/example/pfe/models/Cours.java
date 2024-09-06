package com.example.pfe.models;
import java.util.Date;
import java.util.List;

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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE", length = 20)
public  class Cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String description;
    private double frais;
    private Date date;
    private String hdeb;
    private String hfin;
    private double duree;
    private Boolean approuve;
   @ManyToOne @JoinColumn(name = "categorie_cours_id")  private Categorie_cours Categorie_cours;
   @ManyToOne
   @JoinColumn(name = "instructor_id")
   private Instructor instructor;
   @OneToMany(mappedBy = "cours")
   private List<LigneCours> lignesCours;
   
   
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

    public String getdescription() {
        return description;
    }

    public void setdescription(String description) {
        this.description = description;
    }

    public double getFrais() {
        return frais;
    }

    public void setFrais(double frais) {
        this.frais = frais;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getHdeb() {
        return hdeb;
    }

    public void setHdeb(String hdeb) {
        this.hdeb = hdeb;
    }

    public String getHfin() {
        return hfin;
    }

    public void setHfin(String hfin) {
        this.hfin = hfin;
    }

    public double getDuree() {
        return duree;
    }

    public void setDuree(double duree) {
        this.duree = duree;
    }

	public Boolean getApprouve() {
		return approuve;
	}

	public void setApprouve(Boolean approuve) {
		this.approuve = approuve;
	}

	public Categorie_cours getCategorie_cours() {
		return Categorie_cours;
	}

	public void setCategorie_cours(Categorie_cours categorie_cours) {
		Categorie_cours = categorie_cours;
	}

	public Instructor getInstructor() {
		return instructor;
	}

	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}

	
	
    
}
