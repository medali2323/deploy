package com.example.pfe.services;

import com.example.pfe.models.CategCondidat;
import com.example.pfe.repository.CategCondidatRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategCondidatService {
    @Autowired
    private CategCondidatRepository categCondidatRepository;

    public List<CategCondidat> getAllCategories() {
        return categCondidatRepository.findAll();
    }

    public CategCondidat getCategoryById(Long id) {
        return categCondidatRepository.findById(id).orElse(null);
    }

    public CategCondidat addCategory(CategCondidat category) {
        return categCondidatRepository.save(category);
    }

    public CategCondidat updateCategory(Long id, CategCondidat category) {
        if (categCondidatRepository.existsById(id)) {
            category.setId(id);
            return categCondidatRepository.save(category);
        }
        return null;
    }

    public void deleteCategory(Long id) {
        categCondidatRepository.deleteById(id);
    }
}
