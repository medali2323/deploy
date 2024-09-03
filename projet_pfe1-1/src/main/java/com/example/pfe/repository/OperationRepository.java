package com.example.pfe.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.pfe.models.BonEntree;
import com.example.pfe.models.Operation;

@Repository
public interface OperationRepository extends JpaRepository<Operation, Long> {
	@Query("SELECT o FROM Operation o WHERE o.compte.id = :comptedId")
	List<Operation> getOerationbyCpmpteId(@Param("comptedId") Long venteprodId);
	@Query("SELECT o FROM Operation o WHERE o.date BETWEEN :startDate AND :endDate")
    List<Operation> findByDateBetween(Date startDate, Date endDate);

}