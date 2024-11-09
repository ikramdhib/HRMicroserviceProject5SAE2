package tn.esprit.recruitmentms.services;

import tn.esprit.recruitmentms.entities.JobOffer;

import java.time.LocalDate;
import java.util.List;

public interface IJobOfferService {

    JobOffer createJobOffer(JobOffer jobOffer);

    List<JobOffer> getAllJobOffers();

    JobOffer retrieveJobOffer(Long idJob);

    JobOffer updateJobOfferdate(Long idJob, LocalDate newDateFin);



    void deleteJobOffer(Long idJob);
}
