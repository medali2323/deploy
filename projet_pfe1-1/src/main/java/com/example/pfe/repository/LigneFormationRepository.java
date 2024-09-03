package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.pfe.models.Condidat;
import com.example.pfe.models.LigneFormation;

public interface LigneFormationRepository extends JpaRepository<LigneFormation, Long> {
	
	 }