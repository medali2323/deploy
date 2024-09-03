package com.example.pfe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.pfe.services.JitsiMeetService;
@RestController
@RequestMapping("/testinst")

public class JitsiMeetController {

    private final JitsiMeetService jitsiMeetService;

    @Autowired
    public JitsiMeetController(JitsiMeetService jitsiMeetService) {
        this.jitsiMeetService = jitsiMeetService;
    }

    @GetMapping("/meetjitsi")
    public String generateMeetLink(@RequestParam String meetingName) {
        return jitsiMeetService.generateMeetLink(meetingName);
    }
}
