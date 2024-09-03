package com.example.pfe.services;

import org.springframework.stereotype.Service;

@Service
public class JitsiMeetService {

    public String generateMeetLink(String meetingName) {
        // Générer le lien Jitsi Meet avec le nom de la réunion
        String baseUrl = "https://meet.jit.si/";
        String meetLink = baseUrl + meetingName;

        // Vous pouvez également ajouter des paramètres supplémentaires au lien si nécessaire
        // Par exemple : meetLink += "?userInfo=displayName";

        return meetLink;
    }
}
