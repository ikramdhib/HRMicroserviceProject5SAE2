package tn.esprit.gestionconge.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import tn.esprit.gestionconge.Entities.Utilisateur;
@CrossOrigin(origins = "*")
public interface IUtilisateurRepository extends JpaRepository<Utilisateur,Integer> {
}
