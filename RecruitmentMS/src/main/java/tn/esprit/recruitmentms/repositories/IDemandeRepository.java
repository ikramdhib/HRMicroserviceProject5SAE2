package tn.esprit.recruitmentms.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.recruitmentms.entities.Demande;

import java.util.List;

public interface IDemandeRepository extends JpaRepository<Demande, Long> {
    List<Demande> findByJobOffer_IdJob(Long idJob);
}
