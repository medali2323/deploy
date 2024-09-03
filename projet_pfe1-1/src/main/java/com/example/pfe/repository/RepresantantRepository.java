package com.example.pfe.repository;

import com.example.pfe.models.Represantant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepresantantRepository extends JpaRepository<Represantant, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}