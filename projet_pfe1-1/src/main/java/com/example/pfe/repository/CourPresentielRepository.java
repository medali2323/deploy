package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.CourPresentiel;
import com.example.pfe.models.CourPresentiel;

@Repository
public interface CourPresentielRepository extends JpaRepository<CourPresentiel, Long> {
	  List<CourPresentiel> findByApprouve(Boolean approuve);
	    List<CourPresentiel> findByInstructorId(Long instructorId);

	    @Query("SELECT c FROM CourPresentiel c JOIN c.lignesCours lc WHERE lc.condidat.id = :condidatId")
	    List<CourPresentiel> findByCondidatId(@Param("condidatId") Long condidatId);
	    @Query("SELECT count(*) FROM CourPresentiel")
	    int sommecp();
}
