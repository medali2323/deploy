package com.example.pfe.services;

import com.example.pfe.models.Categ_abonnement;
import com.example.pfe.repository.Categ_abonnementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Categ_abonnementService {
    @Autowired
    private Categ_abonnementRepository categ_abonnementRepository;

    public List<Categ_abonnement> getAllCategories() {
        return categ_abonnementRepository.findAll();
    }

    public Categ_abonnement getCategoryById(Long id) {
        return categ_abonnementRepository.findById(id).orElse(null);
    }

    public Categ_abonnement addCategory(Categ_abonnement category) {
        return categ_abonnementRepository.save(category);
    }

    public Categ_abonnement updateCategory(Long id, Categ_abonnement category) {
        if (categ_abonnementRepository.existsById(id)) {
            category.setId(id);
            return categ_abonnementRepository.save(category);
        }
        return null;
    }

    public void deleteCategory(Long id) {
        categ_abonnementRepository.deleteById(id);
    }
}
