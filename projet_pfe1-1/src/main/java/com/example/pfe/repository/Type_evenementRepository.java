package com.example.pfe.repository;
import com.example.pfe.models.Type_evenement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Type_evenementRepository extends JpaRepository<Type_evenement, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}