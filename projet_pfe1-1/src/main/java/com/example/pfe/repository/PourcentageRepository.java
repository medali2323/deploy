package com.example.pfe.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.Pourcentage;

@Repository
public interface PourcentageRepository extends JpaRepository<Pourcentage, Long> {
    @Query("SELECT p FROM Pourcentage p WHERE p.categoriesInstructeurs.id = (SELECT i.categInstructeur.id FROM Instructor i WHERE i.id = ?1)")
    Pourcentage findByCategoriesInstructeursId(Long id);
}
