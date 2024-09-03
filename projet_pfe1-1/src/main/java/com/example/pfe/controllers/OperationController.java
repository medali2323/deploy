package com.example.pfe.controllers;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.pfe.models.Operation;
import com.example.pfe.services.OperationService;

@RestController
@RequestMapping("/api/Operation")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class OperationController {
    @Autowired
    private OperationService OperationService;

    @GetMapping
    public ResponseEntity<List<Operation>> getAllOperation() {
        List<Operation> Operations = OperationService.getAllOperation();
        return new ResponseEntity<>(Operations, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Operation> getOperationById(@PathVariable Long id) {
    	Operation Operation = OperationService.getOperationById(id);
        return Operation != null ?
                new ResponseEntity<>(Operation, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Operation> addOperation(@RequestBody Operation Operation) {
    	System.out.println(Operation);
        Operation newOperation = OperationService.addOperation(Operation);
        return new ResponseEntity<>(newOperation, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Operation> updateOperation(@PathVariable Long id, @RequestBody Operation Operation) {
        Operation updatedOperation = OperationService.updateOperation(id, Operation);
        return updatedOperation != null ?
                new ResponseEntity<>(updatedOperation, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOperation(@PathVariable Long id) {
        OperationService.deleteOperation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/bycompte/{CompteId}")
    public List<Operation> getLignesDeVenteByCompteId(@PathVariable Long CompteId) {
        return OperationService.getListOerationbyCpmpteId(CompteId);
    }
    @GetMapping("/betweenDates")
    public List<Operation> getListOerationBetweenDates(@RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
                                                     @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return OperationService.getListOerationBetweenDates(startDate, endDate);
    }
}
