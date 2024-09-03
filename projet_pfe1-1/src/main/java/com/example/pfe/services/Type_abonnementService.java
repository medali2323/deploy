package com.example.pfe.services;

import com.example.pfe.models.Type_abonnement;
import com.example.pfe.repository.Type_abonnementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Type_abonnementService {
    @Autowired
    private Type_abonnementRepository type_abonnementRepository;

    public List<Type_abonnement> getAllTypesAbonnement() {
        return type_abonnementRepository.findAll();
    }

    public Type_abonnement getTypeAbonnementById(Long id) {
        return type_abonnementRepository.findById(id).orElse(null);
    }

    public Type_abonnement addTypeAbonnement(Type_abonnement type_abonnement) {
        return type_abonnementRepository.save(type_abonnement);
    }

    public Type_abonnement updateTypeAbonnement(Long id, Type_abonnement type_abonnement) {
        if (type_abonnementRepository.existsById(id)) {
            type_abonnement.setId(id);
            return type_abonnementRepository.save(type_abonnement);
        }
        return null;
    }

    public void deleteTypeAbonnement(Long id) {
        type_abonnementRepository.deleteById(id);
    }
}
