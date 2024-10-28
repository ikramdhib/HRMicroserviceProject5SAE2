package tn.esprit.recruitmentms.controllers;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.recruitmentms.entities.JobOffer;
import tn.esprit.recruitmentms.services.IJobOfferService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/joboffers")
public class JobOfferRController {
    private final IJobOfferService iJobOfferService;

    @Operation(description = "Add JobOffer")
    @PostMapping("/")
    public JobOffer createJobOffer(@RequestBody JobOffer jobOffer) {
        return iJobOfferService.createJobOffer(jobOffer);
    }


    @Operation(description = "Retrieve all JobOffers")
    @GetMapping("/")
    public List<JobOffer> getAllJobOffers() {
        return iJobOfferService.getAllJobOffers();
    }


    @PutMapping("/{idJob}")
    public JobOffer updateJobOfferdate(@PathVariable Long idJob, @RequestBody  LocalDate newDateFin) {
    JobOffer updatedJobOffer = iJobOfferService.updateJobOfferdate(idJob, newDateFin);
    return new ResponseEntity<>(updatedJobOffer, HttpStatus.OK).getBody();
    }




    @Operation(description = "Retrieve Job by Id")
    @GetMapping("/{idJob}")
    public JobOffer retrieveJobOffer(@PathVariable Long idJob) {
        return iJobOfferService.retrieveJobOffer(idJob);
    }



    @DeleteMapping("/{idJob}")
    public ResponseEntity<Object> deleteJobOffer(@PathVariable Long idJob) {
         iJobOfferService.deleteJobOffer(idJob);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
