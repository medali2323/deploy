package com.example.pfe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.LigneProduit;
import com.example.pfe.repository.LigneProduitRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LigneProduitService {
	 @Autowired
	    private LigneProduitRepository LigneProduitRepository;

	    public List<LigneProduit> getAllLigneProduits() {
	        return LigneProduitRepository.findAll();
	    }

	    public LigneProduit getLigneProduitById(Long id) {
	        return LigneProduitRepository.findById(id).orElse(null);
	    }

	    public LigneProduit addLigneProduit(LigneProduit LigneProduit) {
	        return LigneProduitRepository.save(LigneProduit);
	    }

	    public LigneProduit updateLigneProduit(Long id, LigneProduit LigneProduit) {
	        if (LigneProduitRepository.existsById(id)) {
	            LigneProduit.setId(id);
	            return LigneProduitRepository.save(LigneProduit);
	        }
	        return null;
	    }

	    public void deleteLigneProduit(Long id) {
	        LigneProduitRepository.deleteById(id);
	    }
	    public List<LigneProduit> getLignesDeVenteByBonEntreeId(Long bonEntreeId) {
	        return LigneProduitRepository.findByBonEntreeId(bonEntreeId);
	    }
	}
