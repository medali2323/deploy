package com.example.pfe.services;

import com.example.pfe.models.Categorie_Produit;
import com.example.pfe.models.Produit;
import com.example.pfe.repository.Categorie_ProduitRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Categorie_ProduitService {
    @Autowired
    private Categorie_ProduitRepository categorie_ProduitRepository;

    public List<Categorie_Produit> getAllCategories() {
        return categorie_ProduitRepository.findAll();
    }

    public Categorie_Produit getCategoryById(Long id) {
        return categorie_ProduitRepository.findById(id).orElse(null);
    }

    public Categorie_Produit addCategory(Categorie_Produit category) {
        return categorie_ProduitRepository.save(category);
    }

    public Categorie_Produit updateCategory(Long id, Categorie_Produit category) {
        if (categorie_ProduitRepository.existsById(id)) {
            category.setId(id);
            return categorie_ProduitRepository.save(category);
        }
        return null;
    }

    public void deleteCategory(Long id) {
        categorie_ProduitRepository.deleteById(id);
    }
    public List<Produit> getProduitsByCategory(Long id) {
        return categorie_ProduitRepository.findProduitsByCategoryId(id);
    }
}
