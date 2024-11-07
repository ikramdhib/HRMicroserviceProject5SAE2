package tn.esprit.coursservice.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coursservice.model.Cours;
import tn.esprit.coursservice.service.CoursService;

import java.util.List;

@RestController
@RequestMapping("/api/cours")
public class CoursController {
    @Autowired
    private CoursService coursService;

    @GetMapping
    public List<Cours> getAllCours() {
        return coursService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cours> getCoursById(@PathVariable Long id) {
        return coursService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cours createCours(@RequestBody Cours cours) {
        return coursService.save(cours);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cours> updateCours(@PathVariable Long id, @RequestBody Cours coursDetails) {
        return coursService.findById(id)
                .map(cours -> {
                    cours.setTitre(coursDetails.getTitre());
                    cours.setDescription(coursDetails.getDescription());
                    cours.setAuteurId(coursDetails.getAuteurId());
                    coursService.save(cours);
                    return ResponseEntity.ok(cours);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCours(@PathVariable Long id) {
        coursService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

