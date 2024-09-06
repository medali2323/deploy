package com.example.pfe.dto;

public class CoursWithLigneCoursDTO {
    private Long coursId;
    private Long ligneCoursId;
    private boolean paye;
    private boolean approuve;
    
    
    
	public CoursWithLigneCoursDTO() {
		super();
	}
	public CoursWithLigneCoursDTO(Long coursId, Long ligneCoursId, boolean paye, boolean approuve) {
		super();
		this.coursId = coursId;
		this.ligneCoursId = ligneCoursId;
		this.paye = paye;
		this.approuve = approuve;
	}
	public Long getCoursId() {
		return coursId;
	}
	public void setCoursId(Long coursId) {
		this.coursId = coursId;
	}

	public Long getLigneCoursId() {
		return ligneCoursId;
	}
	public void setLigneCoursId(Long ligneCoursId) {
		this.ligneCoursId = ligneCoursId;
	}
	public boolean isPaye() {
		return paye;
	}
	public void setPaye(boolean paye) {
		this.paye = paye;
	}
	public boolean isApprouve() {
		return approuve;
	}
	public void setApprouve(boolean approuve) {
		this.approuve = approuve;
	}
    

}
