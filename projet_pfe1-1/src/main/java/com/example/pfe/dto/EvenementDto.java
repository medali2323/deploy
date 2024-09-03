package com.example.pfe.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.example.pfe.models.Instructor;

import lombok.Builder;
import lombok.Data;
@Data
@Builder // Add this line to enable builder pattern

public class EvenementDto {
    private Long id;
    private String description;
    private LocalDateTime dateHeure;
    private String lienMeet;
    private List<Instructor> participants;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateHeure() {
        return dateHeure;
    }

    public void setDateHeure(LocalDateTime dateHeure) {
        this.dateHeure = dateHeure;
    }

    public String getLienMeet() {
        return lienMeet;
    }

    public void setLienMeet(String lienMeet) {
        this.lienMeet = lienMeet;
    }

	public List<Instructor> getParticipants() {
		return participants;
	}

	public void setParticipants(List<Instructor> participants) {
		this.participants = participants;
	}

	public EvenementDto() {
		super();
	}

	public EvenementDto(Long id, String description, LocalDateTime dateHeure, String lienMeet,
			List<Instructor> participants) {
		super();
		this.id = id;
		this.description = description;
		this.dateHeure = dateHeure;
		this.lienMeet = lienMeet;
		this.participants = participants;
	}

  
}
