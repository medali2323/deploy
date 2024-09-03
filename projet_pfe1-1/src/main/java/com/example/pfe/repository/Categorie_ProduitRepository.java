package com.example.pfe.repository;

import com.example.pfe.models.Categorie_Produit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.pfe.models.Produit;

public interface Categorie_ProduitRepository extends JpaRepository<Categorie_Produit, Long> {
	  @Query("SELECT p FROM Produit p WHERE p.categorie_Produit.id = :categoryId")
	    List<Produit> findProduitsByCategoryId(@Param("categoryId") Long categoryId);
	  
}