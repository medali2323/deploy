package com.example.pfe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.Evenement;
import com.example.pfe.models.Instructor;
import com.example.pfe.models.LigneEvenement;
import com.example.pfe.repository.LigneEvenementRepository;

@Service

public class LigneEvenementService {
    @Autowired
	   private LigneEvenementRepository LigneEvenementRepository;

	    public List<LigneEvenement> getAllLigneEvenements() {
	        return LigneEvenementRepository.findAll();
	    }

	    public LigneEvenement getLigneEvenementById(Long id) {
	        return LigneEvenementRepository.findById(id).orElse(null);
	    }

	    public LigneEvenement addLigneEvenement(LigneEvenement LigneEvenement) {
	        return LigneEvenementRepository.save(LigneEvenement);
	    }

	    public LigneEvenement updateLigneEvenement(Long id, LigneEvenement LigneEvenement) {
	        if (LigneEvenementRepository.existsById(id)) {
	            LigneEvenement.setId(id);
	            return LigneEvenementRepository.save(LigneEvenement);
	        }
	        return null;
	    }

	    public void deleteLigneEvenement(Long id) {
	        try {
	            LigneEvenementRepository.deleteById(id);
	        } catch (Exception e) {
	            // Gérer l'exception, par exemple, imprimer un message d'erreur
	            System.err.println("Erreur lors de la suppression de LigneEvenement avec ID : " + id);
	            e.printStackTrace(); // Imprimez la stack trace pour obtenir des détails sur l'exception
	        }
	    }
	   
	    public List<Instructor> getInstructorsByEvenementId(Long EvenementId) {
	        return LigneEvenementRepository.findDistinctInstructorsByEvenementId(EvenementId);
	    }
	    public List<Instructor> getInstructorsNotByEvenementId(Long EvenementId) {
	        return LigneEvenementRepository.findInstructorsNotInEvenement(EvenementId);
	    }
	    
	    public List<Evenement> findDistinctEvenementByInstructors(Long InstructorId) {
	        return LigneEvenementRepository.findDistinctEvenementByInstructors(InstructorId);
	    }
	}


