package com.example.pfe.services;

import com.example.pfe.models.Categ_formation;
import com.example.pfe.repository.Categ_formationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Categ_formationService {
    @Autowired
    private Categ_formationRepository categ_formationRepository;

    public List<Categ_formation> getAllCategories() {
        return categ_formationRepository.findAll();
    }

    public Categ_formation getCategoryById(Long id) {
        return categ_formationRepository.findById(id).orElse(null);
    }

    public Categ_formation addCategory(Categ_formation category) {
        return categ_formationRepository.save(category);
    }

    public Categ_formation updateCategory(Long id, Categ_formation category) {
        if (categ_formationRepository.existsById(id)) {
            category.setId(id);
            return categ_formationRepository.save(category);
        }
        return null;
    }

    public void deleteCategory(Long id) {
        categ_formationRepository.deleteById(id);
    }
}
