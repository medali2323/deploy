package com.example.pfe.repository;

import com.example.pfe.models.Vente_abonnement;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface Vente_abonnementRepository extends JpaRepository<Vente_abonnement, Long> {
	 @Query("SELECT v FROM Vente_abonnement v WHERE v.instructor.id = :instructorId")
	    List<Vente_abonnement> findByInstructorId(@Param("instructorId") Long instructorId);}