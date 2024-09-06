package com.example.pfe.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.pfe.models.Instructor;
import com.example.pfe.services.InstructorService;
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

@RequestMapping("/api/Instructor")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")

public class InstructorController {
    @Autowired
    private InstructorService InstructorService;
	@Autowired  ServletContext context;
	public static String uploadDirectory=System.getProperty("user.dir") + "/src/main/webapp/images";
    @GetMapping
    public ResponseEntity<List<Instructor>> getAllInstructors() {
        List<Instructor> Instructors = InstructorService.getAllInstructors();
        return new ResponseEntity<>(Instructors, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instructor> getInstructorById(@PathVariable Long id) {
    	Instructor Instructor = InstructorService.getInstructorById(id);
        return Instructor != null ?
                new ResponseEntity<>(Instructor, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping()
    public Instructor addInstructor  (@ModelAttribute Instructor student, @RequestParam("file") MultipartFile file) throws IOException { 
    	String originalFilename = file.getOriginalFilename();
    	
    java.nio.file.Path fileNameAndPath=Paths.get(uploadDirectory, originalFilename);
    Files.write(fileNameAndPath, file.getBytes());
    student.setfilename(originalFilename);
    Instructor savedStudentData = InstructorService.addInstructor(student) ;
    return savedStudentData;
    }
    



    @PutMapping("/{id}")
    public ResponseEntity<Instructor> updateInstructor(@PathVariable Long id, @RequestBody Instructor Instructor) {
        Instructor updatedInstructor = InstructorService.updateInstructor(id, Instructor);
        return updatedInstructor != null ?
                new ResponseEntity<>(updatedInstructor, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInstructor(@PathVariable Long id) {
        InstructorService.deleteInstructor(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/Imgageinstricteur/{id}")
	 public byte[] getPhoto(@PathVariable("id") Long id) throws Exception{
    	Instructor i   =InstructorService.getInstructorById(id);
		 return Files.readAllBytes(Paths.get(context.getRealPath("/images/")+i.getfilename()));
	 }
}
