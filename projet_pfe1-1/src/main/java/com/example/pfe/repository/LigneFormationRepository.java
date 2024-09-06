package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.pfe.models.Condidat;
import com.example.pfe.models.LigneCours;
import com.example.pfe.models.LigneFormation;

public interface LigneFormationRepository extends JpaRepository<LigneFormation, Long> {
	   @Query("SELECT lp FROM LigneFormation lp WHERE lp.condidat.id = :condidatId")

	    List<LigneFormation> findByLigneFormation_Condidat_Id(Long condidatId);
	   @Query("SELECT lp FROM LigneFormation lp WHERE lp.condidat.id = :condidatId and lp.formation.id = :formation_Id")

	    List<LigneFormation> findByLigneFormation_Condidat_Id_Formation_Id(Long condidatId,Long formation_Id);
	 }