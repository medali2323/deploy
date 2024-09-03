package com.example.pfe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.Condidat;
import com.example.pfe.models.LigneFormation;
import com.example.pfe.repository.LigneFormationRepository;


@Service

public class LigneFormationService {
    @Autowired
	   private LigneFormationRepository LigneFormationRepository;

	    public List<LigneFormation> getAllLigneFormations() {
	        return LigneFormationRepository.findAll();
	    }

	    public LigneFormation getLigneFormationById(Long id) {
	        return LigneFormationRepository.findById(id).orElse(null);
	    }

	    public LigneFormation addLigneFormation(LigneFormation LigneFormation) {
	        return LigneFormationRepository.save(LigneFormation);
	    }

	    public LigneFormation updateLigneFormation(Long id, LigneFormation LigneFormation) {
	        if (LigneFormationRepository.existsById(id)) {
	            LigneFormation.setId(id);
	            return LigneFormationRepository.save(LigneFormation);
	        }
	        return null;
	    }

	    public void deleteLigneFormation(Long id) {
	        try {
	            LigneFormationRepository.deleteById(id);
	        } catch (Exception e) {
	            // Gérer l'exception, par exemple, imprimer un message d'erreur
	            System.err.println("Erreur lors de la suppression de LigneFormation avec ID : " + id);
	            e.printStackTrace(); // Imprimez la stack trace pour obtenir des détails sur l'exception
	        }
	    }
	   
	  
	}


