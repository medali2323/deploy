package com.example.pfe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	        Query query = entityManager.createNativeQuery(
	                "SELECT * FROM evenement " +
	                        "LEFT JOIN evenement_en_ligne ON evenement.id = evenement_en_ligne.id " +
	                        "LEFT JOIN evenement_presentiel ON evenement.id = evenement_presentiel.id", Evenement.class);

	        return query.getResultList();
	    }
	    public List<Evenement> findAllApprouve() {
	        return evenementRepository.findByApprouve(true);
	    }

	    public List<Evenement> findAllNonApprouve() {
	        return evenementRepository.findByApprouve(false);
	    }
}
