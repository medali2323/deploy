package com.example.pfe.services;

import com.example.pfe.models.Categ_rep;
import com.example.pfe.repository.Categ_repRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Categ_repService {
    @Autowired
    private Categ_repRepository categ_repRepository;

    public List<Categ_rep> getAllCategories() {
        return categ_repRepository.findAll();
    }

    public Categ_rep getCategoryById(Long id) {
        return categ_repRepository.findById(id).orElse(null);
    }

    public Categ_rep addCategory(Categ_rep category) {
        return categ_repRepository.save(category);
    }

    public Categ_rep updateCategory(Long id, Categ_rep category) {
        if (categ_repRepository.existsById(id)) {
            category.setId(id);
            return categ_repRepository.save(category);
        }
        return null;
    }

    public void deleteCategory(Long id) {
        categ_repRepository.deleteById(id);
    }
}
