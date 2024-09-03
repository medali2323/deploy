package com.example.pfe.repository;

import com.example.pfe.models.EvenementEnLigne;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface EvenementEnLigneRepository extends JpaRepository<EvenementEnLigne, Long> {
	 @Query(value = "SELECT * FROM EvenementEnLigne WHERE instructor_id = ?1", nativeQuery = true)
	    List<EvenementEnLigne> findByInstructorId(Long instructorId);
	 }

