package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.pfe.models.Produit;
import com.example.pfe.services.ProduitService;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.criteria.Path;
import jakarta.servlet.ServletContext;
import org.apache.commons.io.FilenameUtils;
import org.apache.commons.io.FileUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.List;
import java.text.SimpleDateFormat;
import java.util.Date;
@RestController

@RequestMapping("/api/Produit")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class ProduitController {
    @Autowired
    private ProduitService ProduitService;
	@Autowired  ServletContext context;
	public static String uploadDirectory=System.getProperty("user.dir") + "/src/main/webapp/images/produit";
    @GetMapping
    public ResponseEntity<List<Produit>> getAllProduits() {
        List<Produit> Produits = ProduitService.getAllProduits();
        return new ResponseEntity<>(Produits, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
    	Produit Produit = ProduitService.getProduitById(id);
        return Produit != null ?
                new ResponseEntity<>(Produit, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping()
    public Produit addProduit  (@ModelAttribute Produit student, @RequestParam("file") MultipartFile file) throws IOException { 
    	String originalFilename = file.getOriginalFilename();
    	
    java.nio.file.Path fileNameAndPath=Paths.get(uploadDirectory, originalFilename);
    Files.write(fileNameAndPath, file.getBytes());
    student.setPhoto(originalFilename);
    Produit savedStudentData = ProduitService.addProduit(student) ;
    return savedStudentData;
    }
    


    @PutMapping("/{id}")
    public ResponseEntity<Object> updateProduit(@PathVariable Long id, @RequestBody Produit produit) {
        Produit updatedProduit = ProduitService.updateProduit(id, produit);
        if (updatedProduit != null) {
        	System.out.println("edittttttttttt");
            return ResponseEntity.ok()
                    .body(updatedProduit);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduit(@PathVariable Long id) {
        ProduitService.deleteProduit(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/Imgageproduit/{id}")
	 public byte[] getPhoto(@PathVariable("id") Long id) throws Exception{
    	Produit i   =ProduitService.getProduitById(id);
		 return Files.readAllBytes(Paths.get(context.getRealPath("/images/produit/")+i.getPhoto()));
	 }
    @GetMapping("/stock/{produitId}")
    public ResponseEntity<Integer> getQuantiteActuelleProduit(@PathVariable Long produitId) {
        int quantiteActuelle = ProduitService.calculerQuantiteActuelle(produitId);
        return ResponseEntity.ok(quantiteActuelle);
    }
}
