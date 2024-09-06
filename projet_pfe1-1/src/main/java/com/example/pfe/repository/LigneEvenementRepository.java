package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.pfe.models.Evenement;
import com.example.pfe.models.Instructor;
import com.example.pfe.models.LigneEvenement;

public interface LigneEvenementRepository extends JpaRepository<LigneEvenement, Long> {
	 @Query("SELECT DISTINCT lf.instructor FROM LigneEvenement lf WHERE lf.evenement.id = :evenementId")
	    List<Instructor> findDistinctInstructorsByEvenementId(@Param("evenementId") Long evenementId);
	 @Query("SELECT DISTINCT i FROM Instructor i WHERE i.id NOT IN (SELECT lf.instructor.id FROM LigneEvenement lf WHERE lf.evenement.id = :EvenementId)")
	 List<Instructor> findInstructorsNotInEvenement(Long EvenementId);
	 
	 
	 @Query("SELECT DISTINCT lf.evenement FROM LigneEvenement lf WHERE lf.instructor.id = :instructor_Id")
	    List<Evenement> findDistinctEvenementByInstructors(@Param("instructor_Id") Long instructor_Id);
	 }