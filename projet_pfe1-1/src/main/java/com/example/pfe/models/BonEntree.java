package com.example.pfe.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class BonEntree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private Date date;
    private String contacte;
    private double totalHT;
    private double montantTTC;
    @ManyToOne
    @JoinColumn(name = "fournisseur_id")
    private Fournisseur fournisseur;
    @OneToMany(mappedBy = "bonEntree")
    private List<LigneProduit> lignesProduit;
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
	public String getContacte() {
		return contacte;
	}
	public void setContacte(String contacte) {
		this.contacte = contacte;
	}
	public double getTotalHT() {
		return totalHT;
	}
	public void setTotalHT(double totalHT) {
		this.totalHT = totalHT;
	}
	public double getMontantTTC() {
		return montantTTC;
	}
	public void setMontantTTC(double montantTTC) {
		this.montantTTC = montantTTC;
	}
	public Fournisseur getFournisseur() {
		return fournisseur;
	}
	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

	
   
    // Getters and setters
    // Omitted for brevity
}
