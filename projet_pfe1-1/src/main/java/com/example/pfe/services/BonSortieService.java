package com.example.pfe.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.BonSortie;
import com.example.pfe.repository.BonSortieRepository;


@Service
public class BonSortieService {
	 @Autowired
	    private BonSortieRepository BonSortieRepository;

	    public List<BonSortie> getAllBonSortie() {
	        return BonSortieRepository.findAll();
	    }

	    public BonSortie getBonSortieById(Long id) {
	        return BonSortieRepository.findById(id).orElse(null);
	    }

	    public BonSortie addBonSortie(BonSortie BonSortie) {
	        return BonSortieRepository.save(BonSortie);
	    }

	    public BonSortie updateBonSortie(Long id, BonSortie BonSortie) {
	        if (BonSortieRepository.existsById(id)) {
	            BonSortie.setId(id);
	            return BonSortieRepository.save(BonSortie);
	        }
	        return null;
	    }

	    public void deleteBonSortie(Long id) {
	        BonSortieRepository.deleteById(id);
	    }
	    public List<BonSortie> getBonSortiesBetweenDates(Date startDate, Date endDate) {
	        return BonSortieRepository.findByDateBetween(startDate, endDate);
	    }
	}
