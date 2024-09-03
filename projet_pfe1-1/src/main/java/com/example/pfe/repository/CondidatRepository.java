package com.example.pfe.repository;

import com.example.pfe.models.Condidat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CondidatRepository extends JpaRepository<Condidat, Long> {
	 @Query("SELECT c FROM Condidat c WHERE c.instructor.id = :instructorId")
	    List<Condidat> findByInstructorId(@Param("instructorId") Long instructorId);
	 }