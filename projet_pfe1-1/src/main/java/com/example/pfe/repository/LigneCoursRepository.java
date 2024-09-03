package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.pfe.models.Condidat;
import com.example.pfe.models.LigneCours;

public interface LigneCoursRepository extends JpaRepository<LigneCours, Long> {
	
	 }