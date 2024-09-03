package com.example.pfe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.Fournisseur;
import com.example.pfe.repository.FournisseurRepository;

@Service
public class FournisseurService {
    @Autowired
    private FournisseurRepository fournisseurRepository;

    public Fournisseur saveFournisseur(Fournisseur fournisseur) {
        return fournisseurRepository.save(fournisseur);
    }
    public List<Fournisseur> getAllFournisseurs() {
        return fournisseurRepository.findAll();
    }
    public void deleteFournisseur(Long id) {
        fournisseurRepository.deleteById(id);
    }
    public Fournisseur updateFournisseur(Long id, Fournisseur fournisseur) {
        Fournisseur existingFournisseur = fournisseurRepository.findById(id).orElse(null);
        if (existingFournisseur != null) {
            existingFournisseur.setRaisonSociale(fournisseur.getRaisonSociale());
            existingFournisseur.setContacte(fournisseur.getContacte());
            existingFournisseur.setTelephone1(fournisseur.getTelephone1());
            existingFournisseur.setTelephone2(fournisseur.getTelephone2());
            existingFournisseur.setMatriculeFiscale(fournisseur.getMatriculeFiscale());
            existingFournisseur.setRegistreCommerce(fournisseur.getRegistreCommerce());
            return fournisseurRepository.save(existingFournisseur);
        }
        return null;
    }
    public Fournisseur getFournisseurById(Long id) {
        return fournisseurRepository.findById(id).orElse(null);
    }

    // Autres méthodes de service selon vos besoins
}

