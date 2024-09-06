package com.example.pfe.services;

import com.example.pfe.models.Vente_abonnement;
import com.example.pfe.repository.Vente_abonnementRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Transactional
    public Vente_abonnement addVenteAbonnement(Vente_abonnement venteAbonnement) {
        if (venteAbonnement.getInstructor() != null) {
            venteAbonnementRepository.resetDernierVenteByInstructor(venteAbonnement.getInstructor().getId());
        }
        
        // Définir dernierVente à true pour la nouvelle instance
        venteAbonnement.setDernierVente(true);
        
        // Sauvegarder la nouvelle instance
        return venteAbonnementRepository.save(venteAbonnement);
    }

    public Vente_abonnement updateVenteAbonnement(Long id, Vente_abonnement venteAbonnement) {
        if (venteAbonnementRepository.existsById(id)) {
            venteAbonnement.setId(id);
            return venteAbonnementRepository.save(venteAbonnement);
        }
        return null;
    }

    @Transactional
    public void deleteVenteAbonnement(Long id) {
        Optional<Vente_abonnement> venteAbonnementOpt = venteAbonnementRepository.findById(id);
        if (venteAbonnementOpt.isPresent()) {
            Vente_abonnement venteAbonnement = venteAbonnementOpt.get();
            Long instructorId = venteAbonnement.getInstructor().getId();
            venteAbonnementRepository.delete(venteAbonnement);

            Optional<Vente_abonnement> latestAbonnementOpt = venteAbonnementRepository.findLatestVenteAbonnementByInstructor(instructorId);
            latestAbonnementOpt.ifPresent(latestAbonnement -> {
                latestAbonnement.setDernierVente(true);
                venteAbonnementRepository.save(latestAbonnement);
            });
        }
    }
    public List<Vente_abonnement> getVentesAbonnementByInstructor(Long i) {
        return venteAbonnementRepository.findByInstructorId(i);
    }
}
