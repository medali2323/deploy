package com.example.pfe.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.LigneBonSortie;
import com.example.pfe.repository.LigneBonSortieRepository;

@Service
public class LigneBonSortieService {
   
	@Autowired
    private LigneBonSortieRepository LigneBonSortieRepository;

    public List<LigneBonSortie> getAllLigneBonSorties() {
        return LigneBonSortieRepository.findAll();
    }

    public LigneBonSortie getLigneBonSortieById(Long id) {
        return LigneBonSortieRepository.findById(id).orElse(null);
    }

    public LigneBonSortie addLigneBonSortie(LigneBonSortie LigneBonSortie) {
        return LigneBonSortieRepository.save(LigneBonSortie);
    }

    public LigneBonSortie updateLigneBonSortie(Long id, LigneBonSortie LigneBonSortie) {
        if (LigneBonSortieRepository.existsById(id)) {
            LigneBonSortie.setId(id);
            return LigneBonSortieRepository.save(LigneBonSortie);
        }
        return null;
    }

    public void deleteLigneBonSortie(Long id) {
        LigneBonSortieRepository.deleteById(id);
    }
    public List<LigneBonSortie> getLignesDeVenteByBonsortieId(Long bonEntreeId) {
        return LigneBonSortieRepository.findByBonSortieId(bonEntreeId);
    }
}
