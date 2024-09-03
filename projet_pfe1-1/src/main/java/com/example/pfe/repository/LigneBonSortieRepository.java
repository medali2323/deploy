package com.example.pfe.repository;

import com.example.pfe.models.LigneBonSortie;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface LigneBonSortieRepository extends JpaRepository<LigneBonSortie, Long> {
    @Query("SELECT lp FROM LigneBonSortie lp WHERE lp.bonSortie.id = :BonSortieId")
	List<LigneBonSortie> findByBonSortieId(Long BonSortieId);
    // Ajoutez des méthodes personnalisées si nécessaire
}