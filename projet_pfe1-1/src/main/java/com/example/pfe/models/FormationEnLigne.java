package com.example.pfe.models;

import java.util.Date;
import java.util.List;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity

@DiscriminatorValue("FormationEnLigne")
public class FormationEnLigne extends Formation{
private String LienMeet;

public String getLienMeet() {
	return LienMeet;
}

public void setLienMeet(String lienMeet) {
	LienMeet = lienMeet;
}

}
