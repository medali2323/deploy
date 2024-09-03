package com.example.pfe.services;

import com.example.pfe.models.Vente_abonnement;
import com.example.pfe.repository.Vente_abonnementRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenteAbonnementService {
    @Autowired
    private Vente_abonnementRepository venteAbonnementRepository;

    public List<Vente_abonnement> getAllVenteAbonnements() {
        return venteAbonnementRepository.findAll();
    }

    public Vente_abonnement getVenteAbonnementById(Long id) {
        return venteAbonnementRepository.findById(id).orElse(null);
    }

    public Vente_abonnement addVenteAbonnement(Vente_abonnement venteAbonnement) {
        return venteAbonnementRepository.save(venteAbonnement);
    }

    public Vente_abonnement updateVenteAbonnement(Long id, Vente_abonnement venteAbonnement) {
        if (venteAbonnementRepository.existsById(id)) {
            venteAbonnement.setId(id);
            return venteAbonnementRepository.save(venteAbonnement);
        }
        return null;
    }

    public void deleteVenteAbonnement(Long id) {
        venteAbonnementRepository.deleteById(id);
    }
    public List<Vente_abonnement> getVentesAbonnementByInstructor(Long i) {
        return venteAbonnementRepository.findByInstructorId(i);
    }
}
