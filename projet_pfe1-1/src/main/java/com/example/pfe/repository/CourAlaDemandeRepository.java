package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.CourAlaDemande;
import com.example.pfe.models.CourAlaDemande;

@Repository
public interface CourAlaDemandeRepository extends JpaRepository<CourAlaDemande, Long> {

    List<CourAlaDemande> findByApprouve(Boolean approuve);
    List<CourAlaDemande> findByInstructorId(Long instructorId);

    @Query("SELECT c FROM CourAlaDemande c JOIN c.lignesCours lc WHERE lc.condidat.id = :condidatId")
    List<CourAlaDemande> findByCondidatId(@Param("condidatId") Long condidatId);
    @Query("SELECT count(*) FROM CourAlaDemande")
    int sommecal();
}
