package com.example.pfe.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.pfe.models.Fournisseur;

public interface FournisseurRepository extends JpaRepository<Fournisseur, Long> {
    // Vous pouvez ajouter des méthodes spécifiques de requête ici si nécessaire
}