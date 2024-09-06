package com.example.pfe.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.pfe.models.Video;

public interface  VideoRepository extends JpaRepository<Video, Long> {
	
	@Query("SELECT lp FROM Video lp WHERE lp.cours.id = :courId")

    List<Video> findByCours_(Long courId);
}
