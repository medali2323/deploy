package com.example.pfe.repository;

import com.example.pfe.models.Categ_Instructeur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Categ_InstructeurRepository extends JpaRepository<Categ_Instructeur, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}