package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.FormationEnLigne;

@Repository
public interface FormationEnLigneRepository extends JpaRepository<FormationEnLigne, Long> {
	List<FormationEnLigne> findByApprouve(Boolean approuve);
    List<FormationEnLigne> findByInstructorId(Long instructorId);

    @Query("SELECT c FROM FormationEnLigne c JOIN c.lignesFormation lc WHERE lc.condidat.id = :condidatId")
    List<FormationEnLigne> findByCondidatId(@Param("condidatId") Long condidatId);
    
    @Query("SELECT count(*) FROM FormationEnLigne")
    int sommefel();
}