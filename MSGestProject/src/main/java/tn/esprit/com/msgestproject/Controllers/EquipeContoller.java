package tn.esprit.com.msgestproject.Controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.com.msgestproject.Entities.Equipe;
import tn.esprit.com.msgestproject.Entities.Utilisateur;
import tn.esprit.com.msgestproject.Services.EquipeService;

import java.util.List;
import java.util.Set;

@AllArgsConstructor
@RestController
@RequestMapping("/equipe")
public class EquipeContoller {
    private EquipeService equipeService;


    @PostMapping("/add")
    public Equipe addEquipe(@RequestBody Equipe equipe) {
        return equipeService.addEquipe( equipe);
    }

    @PutMapping("/update")
    public Equipe updateEquipe(@RequestBody Equipe equipe) {
        return equipeService.updateEquipe(equipe);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteEquipe(@PathVariable int id) {
        equipeService.deleteEquipe(id);
    }

    @GetMapping("/all")
    public List<Equipe> getAllEquipes() {
        return equipeService.getAllEquipes();
    }

    @GetMapping("/one/{id}")
    public Equipe getOneById(@PathVariable int id) {
        return equipeService.getOneById(id);
    }



    @GetMapping("/geteUserEquiep/{userId}")
    public List<Equipe> getEquipeByUserId(@PathVariable int userId) {

        return equipeService.getEquipesByUserId(userId);
    }

    @GetMapping("/count")
    public long getProjectCount() {
        return equipeService.countProjects();
    }

}
