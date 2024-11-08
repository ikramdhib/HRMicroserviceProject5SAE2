package tn.esprit.recruitmentms.controllers;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.recruitmentms.entities.Demande;
import tn.esprit.recruitmentms.services.IDemandeService;

import java.io.IOException;

@RestController
@AllArgsConstructor
@RequestMapping("/demandes")
public class DemandeRController {
    private final IDemandeService iDemandeService;

    @PostMapping("/postuler")
    public ResponseEntity<Demande> createDemande(
            @RequestPart("demande") Demande demande,
            @RequestPart(value = "cvPath", required = false) MultipartFile cvFile,
            @RequestPart(value = "coverLetterPath", required = false) MultipartFile coverLetterFile) {

        try {
            // Process the creation of the Demande
            Demande createdDemande = iDemandeService.createDemande(demande, cvFile, coverLetterFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDemande);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }





    @GetMapping("/{idDem}")
    public Demande retrieveDemande(@PathVariable("idDem") Long idDem) {
        return iDemandeService.retrieveDemande(idDem);
    }

   @PutMapping("/{idDem}")
    public Demande updateDemande(@PathVariable Long idDem, @RequestBody Demande updatedDemande ) {
        return iDemandeService.updateDemande(idDem, updatedDemande);
    }

    @DeleteMapping("/{idDem}")
    public ResponseEntity<Object> deleteDemande(@PathVariable("idDem") Long idDem) {
        iDemandeService.deleteDemande(idDem);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PostMapping("/filter-and-update")
    public ResponseEntity<Void> filterAndUpdateDemande() {
        iDemandeService.filterAndUpdateDemande();
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
