package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.pfe.dto.CoursWithLigneCoursDTO;
import com.example.pfe.models.Condidat;
import com.example.pfe.models.Cours;
import com.example.pfe.models.LigneCours;

public interface LigneCoursRepository extends JpaRepository<LigneCours, Long> {
    @Query("SELECT lp FROM LigneCours lp WHERE lp.condidat.id = :condidatId")

    List<LigneCours> findByLignesCours_Condidat_Id(Long condidatId);
    
    @Query("SELECT lp FROM LigneCours lp WHERE lp.condidat.id = :condidatId and lp.cours.id = :cours_Id")

    List<LigneCours> findByLignecours_Condidat_Id_cours_Id(Long condidatId,Long cours_Id);
 
	 }