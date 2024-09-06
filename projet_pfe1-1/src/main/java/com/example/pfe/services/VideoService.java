package com.example.pfe.services;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.pfe.models.Video;
import com.example.pfe.models.Cours;
import com.example.pfe.repository.CoursRepository;
import com.example.pfe.repository.VideoRepository;

@Service
public class VideoService {
    
    @Autowired
    private VideoRepository videoRepository;

    @Autowired
    private CoursRepository coursRepository;

    public static String uploadDirectory = System.getProperty("user.dir") + "/src/main/webapp/cours/";

    public VideoService() {
        File uploadDir = new File(uploadDirectory);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
    }

    public List<Video> listerVideosParCours(Long idCours) {
        return videoRepository.findByCours_(idCours);
    }

    public List<Video> uploadVideos(List<MultipartFile> files, Long courseId) throws IOException {
        Cours course = coursRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<Video> uploadedVideos = new ArrayList<>();

        for (MultipartFile file : files) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            String filePath = uploadDirectory + fileName;

            File dest = new File(filePath);
            file.transferTo(dest);
         // Copier le fichier vers le répertoire Angular
            File angularDirectory = new File("D:/3eme_ingebieur/sauvgarde/ConceptSportifFrontEnd/src/assets/cours/");
            FileUtils.copyFileToDirectory(dest, angularDirectory);

            // Créer le chemin relatif à partir du répertoire Angular
            String angularFilePath = "assets/cours/" + fileName;

         
            
            
            Video video = new Video();
            video.setNom(file.getOriginalFilename());
            video.setFilePath(filePath);
            video.setCours(course);

            uploadedVideos.add(videoRepository.save(video));
        }

        return uploadedVideos;
    }
    public List<Video> uploadVideos2(MultipartFile files, Long courseId) throws IOException {
        Cours course = coursRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<Video> uploadedVideos = new ArrayList<>();

            String fileName = System.currentTimeMillis() + "_" + files.getOriginalFilename();
            String filePath = uploadDirectory + fileName;

            File dest = new File(filePath);
            files.transferTo(dest);
         // Copier le fichier vers le répertoire Angular
            File angularDirectory = new File("D:/3eme_ingebieur/sauvgarde/ConceptSportifFrontEnd/src/assets/cours/");
            FileUtils.copyFileToDirectory(dest, angularDirectory);

            // Créer le chemin relatif à partir du répertoire Angular
            String angularFilePath = "assets/cours/" + fileName;

         
            
            
            Video video = new Video();
            video.setNom(files.getOriginalFilename());
            video.setFilePath(filePath);
            video.setCours(course);

            uploadedVideos.add(videoRepository.save(video));
        

        return uploadedVideos;
    }
    public String upload(MultipartFile files) throws IOException {
        


            String fileName = System.currentTimeMillis() + "_" + files.getOriginalFilename();
            String filePath = uploadDirectory + fileName;

            File dest = new File(filePath);
            files.transferTo(dest);
         // Copier le fichier vers le répertoire Angular
            File angularDirectory = new File("D:/3eme_ingebieur/sauvgarde/ConceptSportifFrontEnd/src/assets/cours/");
            FileUtils.copyFileToDirectory(dest, angularDirectory);

            // Créer le chemin relatif à partir du répertoire Angular
            String angularFilePath = "assets/cours/" + fileName;

         
            
            
            
        

        return filePath;
    }
}
