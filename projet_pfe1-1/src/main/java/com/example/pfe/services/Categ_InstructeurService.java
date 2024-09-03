package com.example.pfe.services;

import com.example.pfe.models.Categ_Instructeur;
import com.example.pfe.repository.Categ_InstructeurRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Categ_InstructeurService {
    @Autowired
    private Categ_InstructeurRepository categ_InstructeurRepository;

    public List<Categ_Instructeur> getAllCategories() {
        return categ_InstructeurRepository.findAll();
    }

    public Categ_Instructeur getCategoryById(Long id) {
        return categ_InstructeurRepository.findById(id).orElse(null);
    }

    public Categ_Instructeur addCategory(Categ_Instructeur category) {
        return categ_InstructeurRepository.save(category);
    }

    public Categ_Instructeur updateCategory(Long id, Categ_Instructeur category) {
        if (categ_InstructeurRepository.existsById(id)) {
            category.setId(id);
            return categ_InstructeurRepository.save(category);
        }
        return null;
    }

    public void deleteCategory(Long id) {
        categ_InstructeurRepository.deleteById(id);
    }
}
