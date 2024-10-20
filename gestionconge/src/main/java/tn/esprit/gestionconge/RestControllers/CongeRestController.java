package tn.esprit.gestionconge.RestControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tn.esprit.gestionconge.Entities.Conge;
import tn.esprit.gestionconge.Services.CongeServiceImpl;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/conges")
public class CongeRestController {
    private CongeServiceImpl congeService;

    @PostMapping("/addConge")
    public Conge addConge(@RequestBody Conge conge) {
      return congeService.addConge(conge);
    }

    @PutMapping("/updateConge")
    public Conge updateConge(@RequestBody Conge conge) {
        return congeService.updateConge(conge);
    }

    @GetMapping("/allConge")
    private List<Conge> getAllConge(){
        return congeService.getAllConges();
    }
    @DeleteMapping("/deleteConge/{congeId}")
    public void deleteConge(@PathVariable("congeId") int congeId) {
        congeService.deleteConge(congeId);
    }
}
