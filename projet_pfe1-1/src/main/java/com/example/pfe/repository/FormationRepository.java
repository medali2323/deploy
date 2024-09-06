
package com.example.pfe.repository;

import com.example.pfe.models.Formation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FormationRepository extends JpaRepository<Formation, Long> {
    List<Formation> findByApprouve(Boolean approuve);
    List<Formation> findByInstructorId(Long instructorId);

}