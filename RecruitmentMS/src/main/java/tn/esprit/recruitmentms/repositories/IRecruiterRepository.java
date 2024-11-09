package tn.esprit.recruitmentms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.recruitmentms.entities.Recruiter;

public interface IRecruiterRepository extends JpaRepository<Recruiter, Long> {
}
