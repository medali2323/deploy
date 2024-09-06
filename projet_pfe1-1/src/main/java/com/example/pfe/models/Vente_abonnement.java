package com.example.pfe.models;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
public class Vente_abonnement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String description;
    private Date dateVente;
    private double montantHt;
    private double tauxTva;
    private double montantTtc;
    private double paiement;
    private boolean solder;
    private boolean dernierVente;
    private Date datedeb;
    private Date datefiin;

    @ManyToOne
    @JoinColumn(name = "instructor_id")
    private Instructor instructor;
    @ManyToOne
    @JoinColumn(name = "type_abonnement_id")
    private Type_abonnement typeAbonnement;
    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setId(Long id) {
        this.id = id;
    }

    public Date getDateVente() {
        return dateVente;
    }

    public void setDateVente(Date dateVente) {
        this.dateVente = dateVente;
    }

    public double getMontantHt() {
        return montantHt;
    }

    public void setMontantHt(double montantHt) {
        this.montantHt = montantHt;
    }

    public double getTauxTva() {
        return tauxTva;
    }

    public void setTauxTva(double tauxTva) {
        this.tauxTva = tauxTva;
    }

    public double getMontantTtc() {
        return montantTtc;
    }

    public void setMontantTtc(double montantTtc) {
        this.montantTtc = montantTtc;
    }

   
    public boolean isSolder() {
        return solder;
    }

    public void setSolder(boolean solder) {
        this.solder = solder;
    }

    public Date getDatedeb() {
		return datedeb;
	}

	public void setDatedeb(Date datedeb) {
		this.datedeb = datedeb;
	}

	public Date getDatefiin() {
		return datefiin;
	}

	public void setDatefiin(Date datefiin) {
		this.datefiin = datefiin;
	}

	

	public Instructor getInstructor() {
		return instructor;
	}

	public void setInstructor(Instructor instructor) {
		this.instructor = instructor;
	}

	public Type_abonnement getTypeAbonnement() {
		return typeAbonnement;
	}

	public void setTypeAbonnement(Type_abonnement typeAbonnement) {
		this.typeAbonnement = typeAbonnement;
	}

	public double getPaiement() {
		return paiement;
	}

	public void setPaiement(double paiement) {
		this.paiement = paiement;
	}

	public boolean isDernierVente() {
		return dernierVente;
	}

	public void setDernierVente(boolean dernierVente) {
		this.dernierVente = dernierVente;
	}
    

}
