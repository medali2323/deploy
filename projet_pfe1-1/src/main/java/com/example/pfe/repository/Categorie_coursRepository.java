package com.example.pfe.repository;

import com.example.pfe.models.Categorie_cours;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Categorie_coursRepository extends JpaRepository<Categorie_cours, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}