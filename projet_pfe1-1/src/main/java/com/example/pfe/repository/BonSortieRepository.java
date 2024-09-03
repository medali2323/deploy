package com.example.pfe.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.BonSortie;

@Repository
public interface BonSortieRepository extends JpaRepository<BonSortie, Long> {
	@Query("SELECT b FROM BonSortie b WHERE b.date BETWEEN :startDate AND :endDate")
	List<BonSortie> findByDateBetween(Date startDate, Date endDate);
    // Ajoutez des méthodes personnalisées si nécessaire
}