package tn.esprit.com.msgestproject.Repsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.com.msgestproject.Entities.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
}
