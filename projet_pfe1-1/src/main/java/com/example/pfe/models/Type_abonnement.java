package com.example.pfe.models;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Type_abonnement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private String description;
    private int nembre_mois;
    private float taux_tva;
    private float prix_u_ht;
    private float prix_u_ttc;

    @OneToMany(mappedBy = "typeAbonnement", fetch = FetchType.LAZY)
    private List<Vente_abonnement> venteAbonnements;
    
    @ManyToOne
    @JoinColumn(name = "categ_abonnement_id")
    private Categ_abonnement categ_abonnement;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getNembre_mois() {
        return nembre_mois;
    }

    public void setNembre_mois(int nembre_mois) {
        this.nembre_mois = nembre_mois;
    }

    public float getTaux_tva() {
        return taux_tva;
    }

    public void setTaux_tva(float taux_tva) {
        this.taux_tva = taux_tva;
    }

    public float getPrix_u_ht() {
        return prix_u_ht;
    }

    public void setPrix_u_ht(float prix_u_ht) {
        this.prix_u_ht = prix_u_ht;
    }

    public float getPrix_u_ttc() {
        return prix_u_ttc;
    }

    public void setPrix_u_ttc(float prix_u_ttc) {
        this.prix_u_ttc = prix_u_ttc;
    }

   

    public Categ_abonnement getCateg_abonnement() {
        return categ_abonnement;
    }

    public void setCateg_abonnement(Categ_abonnement categ_abonnement) {
        this.categ_abonnement = categ_abonnement;
    }
}
