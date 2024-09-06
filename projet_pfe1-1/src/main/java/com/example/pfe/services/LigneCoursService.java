package com.example.pfe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.dto.CoursWithLigneCoursDTO;
import com.example.pfe.models.Condidat;
import com.example.pfe.models.LigneCours;
import com.example.pfe.models.LigneCours;
import com.example.pfe.repository.LigneCoursRepository;


@Service

public class LigneCoursService {
    @Autowired
	   private LigneCoursRepository LigneCoursRepository;

	    public List<LigneCours> getAllLigneCourss() {
	        return LigneCoursRepository.findAll();
	    }

	    public LigneCours getLigneCoursById(Long id) {
	        return LigneCoursRepository.findById(id).orElse(null);
	    }

	    public LigneCours addLigneCours(LigneCours LigneCours) {
	        return LigneCoursRepository.save(LigneCours);
	    }

	    public LigneCours updateLigneCours(Long id, LigneCours LigneCours) {
	        if (LigneCoursRepository.existsById(id)) {
	            LigneCours.setId(id);
	            return LigneCoursRepository.save(LigneCours);
	        }
	        return null;
	    }

	    public void deleteLigneCours(Long id) {
	        try {
	            LigneCoursRepository.deleteById(id);
	        } catch (Exception e) {
	            // Gérer l'exception, par exemple, imprimer un message d'erreur
	            System.err.println("Erreur lors de la suppression de LigneCours avec ID : " + id);
	            e.printStackTrace(); // Imprimez la stack trace pour obtenir des détails sur l'exception
	        }
	    }
	   
	    public List<LigneCours> getCoursByCondidatId(Long condidatId) {
	        return LigneCoursRepository.findByLignesCours_Condidat_Id(condidatId);
	    }
	    public List<LigneCours> getLigneCoursByCondidatIdCours_Id(Long condidatId,Long CoursId) {
	        return LigneCoursRepository.findByLignecours_Condidat_Id_cours_Id(condidatId,CoursId);
	    }
	}


