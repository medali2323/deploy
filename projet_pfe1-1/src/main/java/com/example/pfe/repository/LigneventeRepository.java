package com.example.pfe.repository;

import com.example.pfe.models.Lignevente;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LigneventeRepository extends JpaRepository<Lignevente, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
	@Query("SELECT lp FROM Lignevente lp WHERE lp.venteProd.id = :venteprodId")
	List<Lignevente> getLignesDeVenteByVenteProdId(@Param("venteprodId") Long venteprodId);

	
}