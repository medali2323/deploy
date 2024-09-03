package com.example.pfe.repository;

import com.example.pfe.models.Vente_prod;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface Vente_prodRepository extends JpaRepository<Vente_prod, Long> {
	   @Query(value = "SELECT * FROM Vente_prod WHERE instructor_id = ?1", nativeQuery = true)
	    List<Vente_prod> findByInstructor(Long instructorId);}