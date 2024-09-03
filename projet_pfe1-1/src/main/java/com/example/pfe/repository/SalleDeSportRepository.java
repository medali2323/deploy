package com.example.pfe.repository;

import com.example.pfe.models.SalleDeSport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalleDeSportRepository extends JpaRepository<SalleDeSport, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}