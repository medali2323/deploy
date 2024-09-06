package com.example.pfe.repository;

import com.example.pfe.models.Vente_abonnement;

import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface Vente_abonnementRepository extends JpaRepository<Vente_abonnement, Long> {
	 @Query("SELECT v FROM Vente_abonnement v WHERE v.instructor.id = :instructorId")
	    List<Vente_abonnement> findByInstructorId(@Param("instructorId") Long instructorId);
	    @Modifying
	    @Transactional
	    @Query("UPDATE Vente_abonnement v SET v.dernierVente = false WHERE v.instructor.id = :instructorId AND v.dernierVente = true")
	    void resetDernierVenteByInstructor(Long instructorId);
	    @Query("SELECT v FROM Vente_abonnement v WHERE v.instructor.id = :instructorId ORDER BY v.datefiin DESC")
	    Optional<Vente_abonnement> findLatestVenteAbonnementByInstructor(Long instructorId);
}