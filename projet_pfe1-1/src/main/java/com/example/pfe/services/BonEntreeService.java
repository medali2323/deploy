package com.example.pfe.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.BonEntree;
import com.example.pfe.repository.BonEntreeRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BonEntreeService {
	 @Autowired
	    private BonEntreeRepository BonEntreeRepository;

	    public List<BonEntree> getAllBonEntree() {
	        return BonEntreeRepository.findAll();
	    }

	    public BonEntree getBonEntreeById(Long id) {
	        return BonEntreeRepository.findById(id).orElse(null);
	    }

	    public BonEntree addBonEntree(BonEntree BonEntree) {
	        return BonEntreeRepository.save(BonEntree);
	    }

	    public BonEntree updateBonEntree(Long id, BonEntree BonEntree) {
	        if (BonEntreeRepository.existsById(id)) {
	            BonEntree.setId(id);
	            return BonEntreeRepository.save(BonEntree);
	        }
	        return null;
	    }

	    public void deleteBonEntree(Long id) {
	        BonEntreeRepository.deleteById(id);
	    }
	    public List<BonEntree> getBonEntreesBetweenDates(Date startDate, Date endDate) {
	        return BonEntreeRepository.findByDateBetween(startDate, endDate);
	    }
	}
