package com.example.pfe.services;

import com.example.pfe.models.LigneProduit;
import com.example.pfe.models.Lignevente;
import com.example.pfe.repository.LigneventeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LigneventeService {
    @Autowired
    private LigneventeRepository ligneventeRepository;

    public List<Lignevente> getAllLigneventes() {
        return ligneventeRepository.findAll();
    }

    public Lignevente getLigneventeById(Long id) {
        return ligneventeRepository.findById(id).orElse(null);
    }

    public Lignevente addLignevente(Lignevente lignevente) {
        return ligneventeRepository.save(lignevente);
    }

    public Lignevente updateLignevente(Long id, Lignevente lignevente) {
        if (ligneventeRepository.existsById(id)) {
            lignevente.setId(id);
            return ligneventeRepository.save(lignevente);
        }
        return null;
    }

    public void deleteLignevente(Long id) {
        try {
            ligneventeRepository.deleteById(id);
        } catch (Exception e) {
            // Gérer l'exception, par exemple, imprimer un message d'erreur
            System.err.println("Erreur lors de la suppression de Lignevente avec ID : " + id);
            e.printStackTrace(); // Imprimez la stack trace pour obtenir des détails sur l'exception
        }
    }
    public List<Lignevente> getLignesDeVenteByventeprodId(Long venteprodId) {
           return ligneventeRepository.getLignesDeVenteByVenteProdId(venteprodId);
       }
   	
   	
}
