package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.FormationPresentiel;

@Repository
public interface FormationPresentielRepository extends JpaRepository<FormationPresentiel, Long> {

	 List<FormationPresentiel> findByApprouve(Boolean approuve);
	    List<FormationPresentiel> findByInstructorId(Long instructorId);

	    @Query("SELECT c FROM FormationPresentiel c JOIN c.lignesFormation lc WHERE lc.condidat.id = :condidatId")
	    List<FormationPresentiel> findByCondidatId(@Param("condidatId") Long condidatId);
	    
	    @Query("SELECT count(*) FROM FormationPresentiel")
	    int sommefp();
}
