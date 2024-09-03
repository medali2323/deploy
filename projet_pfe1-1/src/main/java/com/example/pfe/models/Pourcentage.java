package com.example.pfe.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Pourcentage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double pourcentageClient;
    private double pourcentageProduit;
    private double pourcentageFormation;
    @OneToOne
    private Categ_Instructeur categoriesInstructeurs;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public double getPourcentageClient() {
		return pourcentageClient;
	}
	public void setPourcentageClient(double pourcentageClient) {
		this.pourcentageClient = pourcentageClient;
	}
	public double getPourcentageProduit() {
		return pourcentageProduit;
	}
	public void setPourcentageProduit(double pourcentageProduit) {
		this.pourcentageProduit = pourcentageProduit;
	}
	public double getPourcentageFormation() {
		return pourcentageFormation;
	}
	public void setPourcentageFormation(double pourcentageFormation) {
		this.pourcentageFormation = pourcentageFormation;
	}
	public Categ_Instructeur getCategoriesInstructeurs() {
		return categoriesInstructeurs;
	}
	public void setCategoriesInstructeurs(Categ_Instructeur categoriesInstructeurs) {
		this.categoriesInstructeurs = categoriesInstructeurs;
	}

}