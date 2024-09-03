package com.example.pfe.repository;

import com.example.pfe.models.Categ_formation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Categ_formationRepository extends JpaRepository<Categ_formation, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}