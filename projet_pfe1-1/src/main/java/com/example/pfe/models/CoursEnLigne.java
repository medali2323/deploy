package com.example.pfe.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity

@DiscriminatorValue("CoursEnLigne")
public class CoursEnLigne extends Cours{
private String lienmeet;

public String getLienmeet() {
	return lienmeet;
}

public void setLienmeet(String lienmeet) {
	this.lienmeet = lienmeet;
}



}
