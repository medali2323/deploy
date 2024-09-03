package com.example.pfe.models;

import jakarta.persistence.*;

@Entity
public class Lignevente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int qte;
    private double puvente;
    private double punetht;
    private double remise;
    @ManyToOne
    @JoinColumn(name = "produit_id") // This references the Produit entity
    private Produit produit;

    @ManyToOne
    @JoinColumn(name = "vente_prod_id") // This references the Vente_prod entity
    private Vente_prod venteProd;
    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getQte() {
        return qte;
    }

    public void setQte(int qte) {
        this.qte = qte;
    }

    public double getPuvente() {
        return puvente;
    }

    public void setPuvente(double puvente) {
        this.puvente = puvente;
    }

    public double getPunetht() {
        return punetht;
    }

    public void setPunetht(double punetht) {
        this.punetht = punetht;
    }

    public double getRemise() {
        return remise;
    }

    public void setRemise(double remise) {
        this.remise = remise;
    }

	public Produit getProduit() {
		return produit;
	}

	public void setProduit(Produit produit) {
		this.produit = produit;
	}

	public Vente_prod getVenteProd() {
		return venteProd;
	}

	public void setVenteProd(Vente_prod venteProd) {
		this.venteProd = venteProd;
	}
    
}
