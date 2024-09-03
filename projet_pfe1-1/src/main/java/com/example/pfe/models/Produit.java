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
public class Produit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codeprod;
    private String desprod;
    private String couleur;
    private String dosage;
    private float prixventeht;
    private float prixventenetht;
    private float prixventettc;
    private float tauxtva;
    private boolean active;
    private String codebarre;
    private String photo;
    private float maxremise;
	@ManyToOne @JoinColumn(name = "categorie_Produit_id") private Categorie_Produit categorie_Produit;

    @OneToMany(mappedBy = "produit")
    private List<LigneProduit> lignesProduit;

    @OneToMany(mappedBy = "produit")
    private List<Lignevente> lignesVente;
    
    @OneToMany(mappedBy = "produit")
    private List<LigneBonSortie> ligneBonSorties;
    
    public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCodeprod() {
		return codeprod;
	}
	public void setCodeprod(String codeprod) {
		this.codeprod = codeprod;
	}
	public String getDesprod() {
		return desprod;
	}
	public void setDesprod(String desprod) {
		this.desprod = desprod;
	}
	public String getCouleur() {
		return couleur;
	}
	public void setCouleur(String couleur) {
		this.couleur = couleur;
	}
	public String getDosage() {
		return dosage;
	}
	public void setDosage(String dosage) {
		this.dosage = dosage;
	}
	public float getPrixventeht() {
		return prixventeht;
	}
	public void setPrixventeht(float prixventeht) {
		this.prixventeht = prixventeht;
	}
	public float getPrixventenetht() {
		return prixventenetht;
	}
	public void setPrixventenetht(float prixventenetht) {
		this.prixventenetht = prixventenetht;
	}
	public float getPrixventettc() {
		return prixventettc;
	}
	public void setPrixventettc(float prixventettc) {
		this.prixventettc = prixventettc;
	}
	public float getTauxtva() {
		return tauxtva;
	}
	public void setTauxtva(float tauxtva) {
		this.tauxtva = tauxtva;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public String getCodebarre() {
		return codebarre;
	}
	public void setCodebarre(String codebarre) {
		this.codebarre = codebarre;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public float getMaxremise() {
		return maxremise;
	}
	public void setMaxremise(float maxremise) {
		this.maxremise = maxremise;
	}
	
	public Categorie_Produit getCategorie_Produit() {
		return categorie_Produit;
	}
	public void setCategorie_Produit(Categorie_Produit categorie_Produit) {
		this.categorie_Produit = categorie_Produit;
	}
	


 
}
