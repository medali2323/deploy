package com.example.pfe.models;

import jakarta.persistence.*;

@Entity
@Table(name = "ligne_produit")
public class LigneProduit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produit_id")
    private Produit produit;

    @ManyToOne
    @JoinColumn(name = "bon_entree_id")
    private BonEntree bonEntree;   
   
    private int quantite;
    // Getters and setters

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Produit getProduit() {
		return produit;
	}

	public void setProduit(Produit produit) {
		this.produit = produit;
	}

	public BonEntree getBonEntree() {
		return bonEntree;
	}

	public void setBonEntree(BonEntree bonEntree) {
		this.bonEntree = bonEntree;
	}

	public int getQuantite() {
		return quantite;
	}

	public void setQuantite(int quantite) {
		this.quantite = quantite;
	}

    
}
