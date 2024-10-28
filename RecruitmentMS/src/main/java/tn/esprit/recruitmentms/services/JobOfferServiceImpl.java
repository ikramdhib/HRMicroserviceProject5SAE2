package tn.esprit.recruitmentms.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.recruitmentms.entities.JobOffer;
import tn.esprit.recruitmentms.entities.Recruiter;
import tn.esprit.recruitmentms.exceptions.ResourceNotFoundException;
import tn.esprit.recruitmentms.repositories.IJobOfferRepository;
import tn.esprit.recruitmentms.repositories.IRecruiterRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class JobOfferServiceImpl implements IJobOfferService{
    private IJobOfferRepository iJobOfferRepository;

    @Override
    public JobOffer createJobOffer(JobOffer jobOffer) {
        {
            return iJobOfferRepository.save(jobOffer);
        }
    }

    @Override
    public List<JobOffer> getAllJobOffers() {
            return iJobOfferRepository.findAll();
    }

    @Override
    public JobOffer retrieveJobOffer(Long idJob) {
        return iJobOfferRepository.findById(idJob).orElse(null);
    }

    @Override


    public JobOffer updateJobOfferdate(Long idJob, LocalDate newDateFin) {
        Optional<JobOffer> optionalJobOffer = iJobOfferRepository.findById(idJob);
        if (optionalJobOffer.isPresent()) {
            JobOffer jobOffer = optionalJobOffer.get();
            jobOffer.setDateFin(newDateFin);
            return iJobOfferRepository.save(jobOffer);
        } else {
            throw new RuntimeException("JobOffer not found with id: " + idJob);
        }
    }


    @Override
    public void deleteJobOffer(Long idJob) {
        if (!iJobOfferRepository.existsById(idJob)) {
            throw new ResourceNotFoundException("Joboffer", idJob);
        }

        iJobOfferRepository.deleteById(idJob);

    }

}
