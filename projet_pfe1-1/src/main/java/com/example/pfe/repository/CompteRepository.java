package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.Compte;

@Repository
public interface CompteRepository extends JpaRepository<Compte, Long> {
	 @Query("SELECT p FROM Compte p WHERE p.instructor.id = :instructorId")
	    Compte  findByInstructeursId(@Param("instructorId") Long instructorId);
	 
	}