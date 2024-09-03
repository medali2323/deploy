package com.example.pfe.services;

import com.example.pfe.models.Type_evenement;
import com.example.pfe.repository.Type_evenementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Type_evenementService {
    @Autowired
    private Type_evenementRepository type_evenementRepository;

    public List<Type_evenement> getAllTypesEvenement() {
        return type_evenementRepository.findAll();
    }

    public Type_evenement getTypeEvenementById(Long id) {
        return type_evenementRepository.findById(id).orElse(null);
    }

    public Type_evenement addTypeEvenement(Type_evenement type_evenement) {
        return type_evenementRepository.save(type_evenement);
    }

    public Type_evenement updateTypeEvenement(Long id, Type_evenement type_evenement) {
        if (type_evenementRepository.existsById(id)) {
            type_evenement.setId(id);
            return type_evenementRepository.save(type_evenement);
        }
        return null;
    }

    public void deleteTypeEvenement(Long id) {
        type_evenementRepository.deleteById(id);
    }
}
