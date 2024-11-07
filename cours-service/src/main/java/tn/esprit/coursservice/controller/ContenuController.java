package tn.esprit.coursservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.coursservice.model.Contenu;
import tn.esprit.coursservice.service.ContenuService;
import tn.esprit.coursservice.service.FileStorageService;

import java.util.List;

@RestController
@RequestMapping("/api/contenus")
public class ContenuController {
    @Autowired
    private ContenuService contenuService;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping
    public List<Contenu> getAllContenus() {
        return contenuService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contenu> getContenuById(@PathVariable Long id) {
        return contenuService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Contenu createContenu(@RequestBody Contenu contenu) {
        return contenuService.save(contenu);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contenu> updateContenu(@PathVariable Long id, @RequestBody Contenu contenuDetails) {
        return contenuService.findById(id)
                .map(contenu -> {
                    contenu.setTitre(contenuDetails.getTitre());
                    contenu.setType(contenuDetails.getType());
                    contenu.setUrl(contenuDetails.getUrl());
                    contenu.setFilePath(contenuDetails.getFilePath());
                    contenu.setOrdre(contenuDetails.getOrdre());
                    contenu.setSectionId(contenuDetails.getSectionId());
                    contenuService.save(contenu);
                    return ResponseEntity.ok(contenu);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContenu(@PathVariable Long id) {
        contenuService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/uploadWithContent")
    public ResponseEntity<Contenu> uploadContenuWithFile(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "url", required = false) String url,
            @RequestParam("titre") String titre,
            @RequestParam("type") String type,
            @RequestParam("ordre") Integer ordre,
            @RequestParam("sectionId") Long sectionId) {

        // Vérification que l'un des deux (file ou url) est présent
        if (file == null && (url == null || url.isEmpty())) {
            return ResponseEntity.badRequest().body(null);
        }

        // Créer un nouvel objet Contenu
        Contenu contenu = new Contenu();
        contenu.setTitre(titre);
        contenu.setType(type);
        contenu.setOrdre(ordre);
        contenu.setSectionId(sectionId);

        // Si un fichier est fourni, stocker le fichier et enregistrer le chemin
        if (file != null) {
            String filePath = fileStorageService.store(file);
            contenu.setFilePath(filePath);
        }

        // Si une URL est fournie, l'enregistrer
        if (url != null && !url.isEmpty()) {
            contenu.setUrl(url);
        }

        // Sauvegarder le contenu
        Contenu savedContenu = contenuService.save(contenu);
        return ResponseEntity.ok(savedContenu);
    }
}
