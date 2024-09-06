package com.example.pfe.services;

import com.example.pfe.models.Produit;
import com.example.pfe.repository.ProduitRepository;

import jakarta.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.Query;
import java.math.BigDecimal; 
import java.util.List;
import java.util.Optional;

@Service
public class ProduitService {
    @Autowired
    private ProduitRepository produitRepository;
    @Autowired
    private EntityManager entityManager;
    public int calculerQuantiteActuelle(Long produitId) {
        String stockQuery = "SELECT COALESCE(SUM(lp.quantite), 0) " +
                            "FROM ligne_produit lp " +
                            "JOIN bon_entree be ON lp.bon_entree_id = be.id " +
                            "WHERE lp.produit_id = :produitId";

        String venteQuery = "SELECT COALESCE(SUM(lv.qte), 0) " +
                            "FROM lignevente lv " +
                            "JOIN vente_prod vp ON lv.vente_prod_id = vp.id " +
                            "WHERE lv.produit_id = :produitId";

        String bonSortieQuery = "SELECT COALESCE(SUM(lbs.quantite), 0) " +
                                "FROM ligne_bon_sortie lbs " +
                                "JOIN bon_sortie bs ON lbs.bon_sortie_id = bs.id " +
                                "WHERE lbs.produit_id = :produitId";

        Query stockQueryObj = entityManager.createNativeQuery(stockQuery);
        stockQueryObj.setParameter("produitId", produitId);
        BigDecimal stockResult = (BigDecimal) stockQueryObj.getSingleResult();

        Query venteQueryObj = entityManager.createNativeQuery(venteQuery);
        venteQueryObj.setParameter("produitId", produitId);
        BigDecimal venteResult = (BigDecimal) venteQueryObj.getSingleResult();

        Query bonSortieQueryObj = entityManager.createNativeQuery(bonSortieQuery);
        bonSortieQueryObj.setParameter("produitId", produitId);
        BigDecimal bonSortieResult = (BigDecimal) bonSortieQueryObj.getSingleResult();

        BigDecimal quantiteActuelle = stockResult.subtract(venteResult).subtract(bonSortieResult);

        // Conversion en int pour obtenir la quantité actuelle en stock
        return quantiteActuelle.intValue();
    }

    
    
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    public Produit getProduitById(Long id) {
        return produitRepository.findById(id).orElse(null);
    }

    public Produit addProduit(Produit produit) {
        return produitRepository.save(produit);
    }

    public Produit updateProduit(Long id, Produit produit) {
        Optional<Produit> existingProduit = produitRepository.findById(id);
        if (existingProduit.isPresent()) {
            Produit updatedProduit = existingProduit.get();
            // Mettre à jour les champs du produit existant avec les valeurs de produit
            updatedProduit.setCodeprod(produit.getCodeprod());
            updatedProduit.setDesprod(produit.getDesprod());
            updatedProduit.setCouleur(produit.getCouleur());
            updatedProduit.setDosage(produit.getDosage());
            updatedProduit.setPrixventeht(produit.getPrixventeht());
            updatedProduit.setPrixventenetht(produit.getPrixventenetht());
            updatedProduit.setPrixventettc(produit.getPrixventettc());
            updatedProduit.setTauxtva(produit.getTauxtva());
            updatedProduit.setActive(produit.isActive());
            updatedProduit.setCodebarre(produit.getCodebarre());
            updatedProduit.setPhoto(produit.getPhoto());
            updatedProduit.setMaxremise(produit.getMaxremise());
            updatedProduit.setCategorie_Produit(produit.getCategorie_Produit());

            // Enregistrer le produit mis à jour dans la base de données
            return produitRepository.save(updatedProduit);
        }
        return null;
    }


    public void deleteProduit(Long id) {
        produitRepository.deleteById(id);
    }
}
