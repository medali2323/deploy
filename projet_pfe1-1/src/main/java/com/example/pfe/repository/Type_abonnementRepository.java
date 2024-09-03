package com.example.pfe.repository;
import com.example.pfe.models.Type_abonnement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Type_abonnementRepository extends JpaRepository<Type_abonnement, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}