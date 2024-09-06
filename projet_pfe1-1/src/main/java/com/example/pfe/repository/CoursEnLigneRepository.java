package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.CoursEnLigne;
import com.example.pfe.models.CoursEnLigne;

@Repository
public interface CoursEnLigneRepository extends JpaRepository<CoursEnLigne, Long> {
	  List<CoursEnLigne> findByApprouve(Boolean approuve);
	    List<CoursEnLigne> findByInstructorId(Long instructorId);

	    @Query("SELECT c FROM CoursEnLigne c JOIN c.lignesCours lc WHERE lc.condidat.id = :condidatId")
	    List<CoursEnLigne> findByCondidatId(@Param("condidatId") Long condidatId);
	    
	    @Query("SELECT count(*) FROM CoursEnLigne")
	    int sommecel();
}
