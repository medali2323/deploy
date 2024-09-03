package com.example.pfe.services;

import com.example.pfe.models.EvenementPresentiel;
import com.example.pfe.repository.EvenementPresentielRepository;

import io.jsonwebtoken.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.GeneralSecurityException;
import java.util.List;

@Service
public class EvenementPresentielService {
    @Autowired
    private EvenementPresentielRepository EvenementPresentielRepository;
  
    public List<EvenementPresentiel> getAllEvenementPresentiels() {
        return EvenementPresentielRepository.findAll();
    }

    public EvenementPresentiel getEvenementPresentielById(Long id) {
        return EvenementPresentielRepository.findById(id).orElse(null);
    }

    public EvenementPresentiel addEvenementPresentiel(EvenementPresentiel EvenementPresentiel) {
        return EvenementPresentielRepository.save(EvenementPresentiel);
    }

    public EvenementPresentiel updateEvenementPresentiel(Long id, EvenementPresentiel EvenementPresentiel) {
        if (EvenementPresentielRepository.existsById(id)) {
            EvenementPresentiel.setId(id);
            return EvenementPresentielRepository.save(EvenementPresentiel);
        }
        return null;
    }

    public void deleteEvenementPresentiel(Long id) {
        EvenementPresentielRepository.deleteById(id);
    }
    public List<EvenementPresentiel> getEvenementPresentielsByInstructorId(Long instructorId) {
        return EvenementPresentielRepository.findByInstructorId(instructorId);
    }
}
