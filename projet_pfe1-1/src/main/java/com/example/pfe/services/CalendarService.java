package com.example.pfe.services;
import com.exemple.pfe.utils.GoogleCalendarClient;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.Events;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@Service
public class CalendarService {

	 private final GoogleCalendarClient googleCalendarClient;

	    @Autowired
	    public CalendarService(GoogleCalendarClient googleCalendarClient) {
	        this.googleCalendarClient = googleCalendarClient;
	    }

    public String createEvent() throws IOException, GeneralSecurityException {

Event e = new Event()
    .setSummary("Google I/O 2015")
    .setLocation("800 Howard St., San Francisco, CA 94103")
    .setDescription("A chance to hear more about Google's developer products.");

DateTime startDateTime = new DateTime("2024-05-28T09:00:00-07:00");
EventDateTime start = new EventDateTime()
    .setDateTime(startDateTime)
    .setTimeZone("America/Los_Angeles");
e.setStart(start);

DateTime endDateTime = new DateTime("2024-05-28T17:00:00-07:00");
EventDateTime end = new EventDateTime()
    .setDateTime(endDateTime)
    .setTimeZone("America/Los_Angeles");
e.setEnd(end);

        Calendar service = googleCalendarClient.getCalendarService();
        String calendarId = "primary";
        e = service.events().insert(calendarId, e).execute();
        System.out.printf("Event created: %s\n", e.getHtmlLink());
		return calendarId;
    }

    public List<Event> getEvents() throws IOException, GeneralSecurityException {
        Calendar service = googleCalendarClient.getCalendarService();
        DateTime now = new DateTime(System.currentTimeMillis());
        Events events = service.events().list("primary")
                .setMaxResults(10000)
                .setTimeMin(now)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute();
        return events.getItems();
    }

    public String updateEvent(String eventId, Event updatedEvent) throws IOException, GeneralSecurityException {
        Calendar service = googleCalendarClient.getCalendarService();
        Event event = service.events().update("primary", eventId, updatedEvent).execute();
        return event.getId(); // Return the ID of the updated event
    }

    public String deleteEvent(String eventId) throws IOException, GeneralSecurityException {
        Calendar service = googleCalendarClient.getCalendarService();
        service.events().delete("primary", eventId).execute();
        return "Event deleted successfully";
    }
}
