package com.example.pfe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.pfe.services.MeetService;


@RestController
@RequestMapping("/testinst/meet")
public class MeetController {

    private final MeetService meetService;

    @Autowired
    public MeetController(MeetService meetService) {
        this.meetService = meetService;
    }

    @PostMapping("/createSpace")
    public void createMeetingSpace() throws Exception {
        meetService.createMeetingSpace();
    }
}
