package tn.esprit.recruitmentms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.recruitmentms.entities.JobOffer;

public interface IJobOfferRepository extends JpaRepository<JobOffer, Long> {
}
