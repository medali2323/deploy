package com.example.pfe.services;

import com.example.pfe.models.Categorie_cours;
import com.example.pfe.repository.Categorie_coursRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Categorie_coursService {
    @Autowired
    private Categorie_coursRepository categorie_coursRepository;

    public List<Categorie_cours> getAllCategories() {
        return categorie_coursRepository.findAll();
    }

    public Categorie_cours getCategoryById(Long id) {
        return categorie_coursRepository.findById(id).orElse(null);
    }

    public Categorie_cours addCategory(Categorie_cours category) {
        return categorie_coursRepository.save(category);
    }

    public Categorie_cours updateCategory(Long id, Categorie_cours category) {
        if (categorie_coursRepository.existsById(id)) {
            category.setId(id);
            return categorie_coursRepository.save(category);
        }
        return null;
    }

    public void deleteCategory(Long id) {
        categorie_coursRepository.deleteById(id);
    }
}
