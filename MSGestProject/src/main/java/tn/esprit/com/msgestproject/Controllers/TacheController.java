package tn.esprit.com.msgestproject.Controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.com.msgestproject.Entities.Status;
import tn.esprit.com.msgestproject.Entities.Tache;
import tn.esprit.com.msgestproject.Services.TacheService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/tache")
public class TacheController {
    private TacheService tacheService;

    @PostMapping("/add")
    public Tache addTache(@RequestBody Tache tache) {
        return tacheService.addTache(tache);
    }

    @GetMapping("/all")
    public List<Tache> getAllTaches() {
        return tacheService.getAllTaches();
    }

    @GetMapping("/getOne/{id}")
    public Tache getOneTache(@PathVariable int id) {
        return tacheService.getOneTache(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteTache(@PathVariable int id) {
        tacheService.deleteTache(id);
    }

    @PostMapping("/update")
    public Tache updateTache(@RequestBody Tache tache) {
        return tacheService.updateTache(tache);
    }

    @GetMapping("/getbyStatu/{status}")
    public List<Tache> getTacheWithStatus(@PathVariable Status status) {
        return tacheService.getTacheWithStatus(status);
    }
    @GetMapping("/getAllbyID/{integers}")
    public List<Tache> getAllById(@PathVariable List<Integer> integers) {
        return tacheService.getAllById(integers);
    }
    @GetMapping("/getallprojectid/{id}")
    public List<Tache> getAllByProjectId(@PathVariable int id) {
        return tacheService.getAllByProjectId(id);
    }
    @GetMapping("/getusertaches/{userId}/{projetId}")
    public List<Tache> getAllTcahesWithUserIdAndProjectId(@PathVariable int userId,@PathVariable int projetId) {
        return tacheService.getAllTcahesWithUserIdAndProjectId(userId,projetId);
    }

    @PutMapping("/updateStatus/{id}/{status}")
    public Tache updateStatus(@PathVariable int id, @PathVariable Status status){
        return tacheService.updateStatus(id , status);
    }

}
