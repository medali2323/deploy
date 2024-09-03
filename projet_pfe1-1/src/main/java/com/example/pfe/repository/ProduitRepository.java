package com.example.pfe.repository;


import com.example.pfe.models.Produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository extends JpaRepository<Produit, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}