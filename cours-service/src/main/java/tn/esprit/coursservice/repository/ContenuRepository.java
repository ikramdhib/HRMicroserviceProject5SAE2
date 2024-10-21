package tn.esprit.coursservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.coursservice.model.Contenu;

public interface ContenuRepository extends JpaRepository<Contenu, Long> {
}
