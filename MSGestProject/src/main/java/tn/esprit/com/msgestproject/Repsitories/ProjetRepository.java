package tn.esprit.com.msgestproject.Repsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.com.msgestproject.Entities.Projet;

public interface ProjetRepository extends JpaRepository<Projet,Integer> {
}
