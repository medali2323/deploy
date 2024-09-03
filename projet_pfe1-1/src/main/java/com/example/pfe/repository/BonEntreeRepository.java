package com.example.pfe.repository;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.BonEntree;

@Repository
public interface BonEntreeRepository extends JpaRepository<BonEntree, Long> {
    // Ajoutez des méthodes spécifiques au besoin
	@Query("SELECT b FROM BonEntree b WHERE b.date BETWEEN :startDate AND :endDate")
    List<BonEntree> findByDateBetween(Date startDate, Date endDate);
}
