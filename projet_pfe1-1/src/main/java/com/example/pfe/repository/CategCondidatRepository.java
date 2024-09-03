package com.example.pfe.repository;

import com.example.pfe.models.CategCondidat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategCondidatRepository extends JpaRepository<CategCondidat, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}