package com.example.pfe.repository;

import com.example.pfe.models.Condidat;
import com.example.pfe.models.Cours;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CoursRepository extends JpaRepository<Cours, Long> {
    List<Cours> findByApprouve(Boolean approuve);

}