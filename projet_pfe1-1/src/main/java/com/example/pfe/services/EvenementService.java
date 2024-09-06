package com.example.pfe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.Evenement;
import com.example.pfe.models.Evenement;
import com.example.pfe.repository.EvenementRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;


@Service
public class EvenementService {

	 @PersistenceContext
	    private EntityManager entityManager;
	   private final EvenementRepository evenementRepository;

	    @Autowired
	    public EvenementService(EvenementRepository evenementRepository) {
	        this.evenementRepository = evenementRepository;
	    }
	    public List<Evenement> getAllEvenements() {
	        

	        return evenementRepository.findAll();
	    }
	    public List<Evenement> findAllApprouve() {
	        return evenementRepository.findByApprouve(true);
	    }

	    public List<Evenement> findAllNonApprouve() {
	        return evenementRepository.findByApprouve(false);
	    }
	    public Evenement updateEvenement(Long id, Evenement Evenement) {
	        if (evenementRepository.existsById(id)) {
	            Evenement.setId(id);
	            return evenementRepository.save(Evenement);
	        }
	        return null;
	    }
}
