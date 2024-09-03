package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.LigneProduit;

@Repository
public interface LigneProduitRepository extends JpaRepository<LigneProduit, Long> {
    // Ajoutez des méthodes spécifiques au besoin

    @Query("SELECT lp FROM LigneProduit lp WHERE lp.bonEntree.id = :bonEntreeId")
    List<LigneProduit> findByBonEntreeId(@Param("bonEntreeId") Long bonEntreeId);

}