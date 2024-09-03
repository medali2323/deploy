package com.example.pfe.services;

import com.example.pfe.models.EvenementEnLigne;
import com.example.pfe.repository.EvenementEnLigneRepository;

import io.jsonwebtoken.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.GeneralSecurityException;
import java.util.List;

@Service
public class EvenementEnLigneService {
    @Autowired
    private EvenementEnLigneRepository EvenementEnLigneRepository;
  
    public List<EvenementEnLigne> getAllEvenementEnLignes() {
        return EvenementEnLigneRepository.findAll();
    }

    public EvenementEnLigne getEvenementEnLigneById(Long id) {
        return EvenementEnLigneRepository.findById(id).orElse(null);
    }

    public EvenementEnLigne addEvenementEnLigne(EvenementEnLigne EvenementEnLigne) {
        return EvenementEnLigneRepository.save(EvenementEnLigne);
    }

    public EvenementEnLigne updateEvenementEnLigne(Long id, EvenementEnLigne EvenementEnLigne) {
        if (EvenementEnLigneRepository.existsById(id)) {
            EvenementEnLigne.setId(id);
            return EvenementEnLigneRepository.save(EvenementEnLigne);
        }
        return null;
    }

    public void deleteEvenementEnLigne(Long id) {
        EvenementEnLigneRepository.deleteById(id);
    }
    public List<EvenementEnLigne> getEvenementEnLignesByInstructorId(Long instructorId) {
        return EvenementEnLigneRepository.findByInstructorId(instructorId);
    }
}
