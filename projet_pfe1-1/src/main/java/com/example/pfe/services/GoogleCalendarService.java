package com.example.pfe.services;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.pfe.dto.EvenementDto;
import com.example.pfe.models.Admin;
import com.example.pfe.models.EvenementEnLigne;
import com.example.pfe.payload.request.CalenderDto;
import com.example.pfe.repository.AdminRepository;
import com.example.pfe.repository.EvenementEnLigneRepository;
import com.example.pfe.security.services.EmailService;
import com.exemple.pfe.utils.CalendarQuickstart;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.EventDateTime;
import com.google.api.services.calendar.model.EventReminder;
import com.google.api.services.calendar.model.EventAttendee;
import com.google.api.services.calendar.model.Event.ExtendedProperties;
import com.google.api.services.calendar.model.ColorDefinition;
import com.google.api.client.json.gson.GsonFactory;

@Service
public class GoogleCalendarService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private EvenementEnLigneRepository evenementEnLigneRepository;

    @Autowired
    private EmailService emailService;

    private static final String APPLICATION_NAME = "apiintegration";
    private static final String CREDENTIALS_FILE_PATH = "credentials.json";

    public void addEventToCalendar(String calendarId, EvenementDto evenementDto) throws IOException, GeneralSecurityException {
        Calendar service = getCalendarService();

        Event event = new Event()
                .setSummary(evenementDto.getDescription())
                .setDescription("Description de l'événement");

        DateTime startDateTime = new DateTime(evenementDto.getDateHeure().toString());
        EventDateTime start = new EventDateTime()
                .setDateTime(startDateTime)
                .setTimeZone("UTC");
        event.setStart(start);

        DateTime endDateTime = new DateTime(evenementDto.getDateHeure().plusHours(1).toString());
        EventDateTime end = new EventDateTime()
                .setDateTime(endDateTime)
                .setTimeZone("UTC");
        event.setEnd(end);

        service.events().insert(calendarId, event).execute();
    }

    private Calendar getCalendarService() throws IOException, GeneralSecurityException {
        InputStream in = getClass().getResourceAsStream("/marine-duality-422210-b3-dd0743977d86.json");
        if (in == null) {
            throw new FileNotFoundException("Resource not found: marine-duality-422210-b3-dd0743977d86.json");
        }

        HttpTransport httpTransport = GoogleNetHttpTransport.newTrustedTransport();
        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();
        GoogleCredential credential = GoogleCredential.fromStream(in)
                .createScoped(Collections.singleton(CalendarScopes.CALENDAR));

        return new Calendar.Builder(httpTransport, jsonFactory, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }
}
