package com.example.pfe.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Condidat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String prenom;
    private String tel1;
    private String tel2;
    private String email;
    private String adresse;
    private double mt_affiliation;
    private String code_postal; 
    @ManyToOne
    @JoinColumn(name = "categ_condidat_id")
    private CategCondidat categCondidat;
    @ManyToOne
    @JoinColumn(name = "salle_id")
    private SalleDeSport salle_de_sport; 
    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;
    
    @OneToMany(mappedBy = "condidat")
    private List<LigneCours> lignesCours;
    @OneToMany(mappedBy = "condidat")
    private List<LigneFormation> LignesFormation;
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getTel1() {
        return tel1;
    }

    public void setTel1(String tel1) {
        this.tel1 = tel1;
    }

    public String getTel2() {
        return tel2;
    }

    public void setTel2(String tel2) {
        this.tel2 = tel2;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }


	public double getMt_affiliation() {
        return mt_affiliation;
    }

    public void setMt_affiliation(double mt_affiliation) {
        this.mt_affiliation = mt_affiliation;
    }



	public String getCode_postal() {
		return code_postal;
	}

	public void setCode_postal(String code_postal) {
		this.code_postal = code_postal;
	}

	public CategCondidat getCategCondidat() {
		return categCondidat;
	}

	public void setCategCondidat(CategCondidat categCondidat) {
		this.categCondidat = categCondidat;
	}

	public SalleDeSport getSalle_de_sport() {
		return salle_de_sport;
	}

	public void setSalle_de_sport(SalleDeSport salle_de_sport) {
		this.salle_de_sport = salle_de_sport;
	}

	public Instructor getInstructor() {
		return instructor;
	}

	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}
    
}
