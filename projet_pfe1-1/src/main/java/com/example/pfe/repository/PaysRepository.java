package com.example.pfe.repository;
import com.example.pfe.models.Pays;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaysRepository extends JpaRepository<Pays, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}
