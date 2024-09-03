package com.example.pfe.payload.request;

import biweekly.property.Attendee;
import biweekly.property.Organizer;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.time.LocalDateTime;
import java.util.List;

import com.example.pfe.models.Admin;
import com.example.pfe.models.Instructor;

import biweekly.property.Attendee;
import lombok.Builder;
import lombok.Data;
@Data
@Builder(toBuilder = true)
public class CalenderDto {
	private String subject;
    private String description;
    private String summary;
    private Admin organizer;
    private String meetingLink;
    private LocalDateTime eventDateTime;
    private List<Attendee> attendees;
	public CalenderDto() {
		super();
	}
	public CalenderDto(String subject, String description, String summary, Admin organizer, String meetingLink,
			LocalDateTime eventDateTime, List<Attendee> attendees) {
		super();
		this.subject = subject;
		this.description = description;
		this.summary = summary;
		this.organizer = organizer;
		this.meetingLink = meetingLink;
		this.eventDateTime = eventDateTime;
		this.attendees = attendees;
	}
	
    
}
