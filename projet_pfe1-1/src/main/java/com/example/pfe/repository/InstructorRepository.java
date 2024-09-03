package com.example.pfe.repository;

import com.example.pfe.models.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InstructorRepository extends JpaRepository<Instructor, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}