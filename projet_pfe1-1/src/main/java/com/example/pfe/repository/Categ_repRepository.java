package com.example.pfe.repository;

import com.example.pfe.models.Categ_rep;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Categ_repRepository extends JpaRepository<Categ_rep, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}