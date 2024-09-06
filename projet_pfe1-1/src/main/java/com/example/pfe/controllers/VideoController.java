package com.example.pfe.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.pfe.models.Video;
import com.example.pfe.services.VideoService;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/videos")
@PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR')")
public class VideoController {

    @Autowired
    private VideoService videoService;

    @PostMapping("/upload/{courseId}")
    public ResponseEntity<List<Video>> uploadVideos(@RequestParam("files") List<MultipartFile> files, @PathVariable Long courseId) {
        try {
            List<Video> videos = videoService.uploadVideos(files, courseId);
            return ResponseEntity.ok(videos);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @PostMapping("/upload2/{courseId}")
    public ResponseEntity<List<Video>> uploadVideos2(@RequestParam("files") MultipartFile files, @PathVariable Long courseId) {
        try {
            List<Video> videos = videoService.uploadVideos2(files, courseId);
            return ResponseEntity.ok(videos);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('INSTRUCTOR') or hasRole('CANDIDAT')")
    @GetMapping("/upload2/{courseId}")
    public ResponseEntity<List<Video>> listerVideosParCours(@PathVariable Long idCours) {
        List<Video> videos = videoService.listerVideosParCours(idCours);
        return ResponseEntity.ok(videos);
    }
    @PostMapping("/uploadvideo")
    public ResponseEntity<Map<String, String>> upload(@RequestParam("files") MultipartFile files) {
        Map<String, String> response = new HashMap<>();
        try {
            String filePath = videoService.upload(files);
            response.put("filePath", filePath);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
