package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.FormationAlaDemande;

@Repository
public interface FormationAlaDemandeRepository extends JpaRepository<FormationAlaDemande, Long> {
	 List<FormationAlaDemande> findByApprouve(Boolean approuve);
	    List<FormationAlaDemande> findByInstructorId(Long instructorId);

	    @Query("SELECT c FROM FormationAlaDemande c JOIN c.lignesFormation lc WHERE lc.condidat.id = :condidatId")
	    List<FormationAlaDemande> findByCondidatId(@Param("condidatId") Long condidatId);
	    @Query("SELECT count(*) FROM FormationAlaDemande")
	    int sommefal();
}
