package tn.esprit.com.msgestproject.Controllers;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.com.msgestproject.Entities.Projet;
import tn.esprit.com.msgestproject.Services.ProjetService;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/projet")
public class ProjetController {
    private ProjetService projetService;

    @PostMapping("/addProject")
    public Projet saveProjet(@RequestBody Projet projet){
        return projetService.saveProjet(projet);
    }
    @GetMapping("/getProjet/{id}")
    public Projet getProjetById(@PathVariable int id){
        return projetService.getprojetById(id);
    }

    @GetMapping("/all")
    public List<Projet> getAllProjets() {
        return projetService.getAllProjets();
    }

    @PutMapping ("/update")
    public Projet updateProjet(@RequestBody Projet projet) {
        return projetService.updateProjet( projet);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProjet(@PathVariable int id) {
        projetService.deleteProjet(id);
    }

    @GetMapping("/getprojetWithUserId/{userId}")
    public List<Projet> getProjetsByUserId(@PathVariable int userId) {
        return projetService.getProjetsByUserId(userId);
    }
}
