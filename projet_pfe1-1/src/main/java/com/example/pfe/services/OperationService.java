package com.example.pfe.services;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.models.Operation;
import com.example.pfe.repository.OperationRepository;

@Service
public class OperationService {
	  @Autowired
	    private OperationRepository OperationRepository;

	    public List<Operation> getAllOperation() {
	        return OperationRepository.findAll();
	    }

	    public Operation getOperationById(Long id) {
	        return OperationRepository.findById(id).orElse(null);
	    }

	    public Operation addOperation(Operation Operation) {
	        return OperationRepository.save(Operation);
	    }

	    public Operation updateOperation(Long id, Operation Operation) {
	        if (OperationRepository.existsById(id)) {
	            Operation.setId(id);
	            return OperationRepository.save(Operation);
	        }
	        return null;
	    }

	    public void deleteOperation(Long id) {
	        OperationRepository.deleteById(id);
	    }
	    public List<Operation> getListOerationbyCpmpteId(Long compteid) {
	           return OperationRepository.getOerationbyCpmpteId(compteid);
	       }
	    public List<Operation> getListOerationBetweenDates(Date startDate, Date endDate) {
	        return OperationRepository.findByDateBetween(startDate, endDate);
	    }
	}
