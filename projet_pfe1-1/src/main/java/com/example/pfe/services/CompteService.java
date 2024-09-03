package com.example.pfe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.Compte;
import com.example.pfe.repository.CompteRepository;

@Service
public class CompteService {
	   @Autowired
	    private CompteRepository CompteRepository;

	    public List<Compte> getAllComptes() {
	        return CompteRepository.findAll();
	    }

	    public Compte getCompteById(Long id) {
	        return CompteRepository.findById(id).orElse(null);
	    }

	    public Compte addCompte(Compte Compte) {
	        return CompteRepository.save(Compte);
	    }

	    public Compte updateCompte(Long id, Compte Compte) {
	        if (CompteRepository.existsById(id)) {
	            Compte.setId(id);
	            return CompteRepository.save(Compte);
	        }
	        return null;
	    }

	    public void deleteCompte(Long id) {
	        CompteRepository.deleteById(id);
	    }
	    public Compte getCompteByInstructorId(Long id) {
	        return CompteRepository.findByInstructeursId(id);
	    }
	}
