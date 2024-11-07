package tn.esprit.coursservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.coursservice.model.Section;
import tn.esprit.coursservice.service.SectionService;

import java.util.List;

@RestController
@RequestMapping("/api/sections")
public class SectionController {
    @Autowired
    private SectionService sectionService;

    @GetMapping
    public List<Section> getAllSections() {
        return sectionService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Section> getSectionById(@PathVariable Long id) {
        return sectionService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Section createSection(@RequestBody Section section) {
        return sectionService.save(section);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Section> updateSection(@PathVariable Long id, @RequestBody Section sectionDetails) {
        return sectionService.findById(id)
                .map(section -> {
                    section.setTitre(sectionDetails.getTitre());
                    section.setOrdre(sectionDetails.getOrdre());
                    section.setCoursId(sectionDetails.getCoursId());
                    sectionService.save(section);
                    return ResponseEntity.ok(section);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long id) {
        sectionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
