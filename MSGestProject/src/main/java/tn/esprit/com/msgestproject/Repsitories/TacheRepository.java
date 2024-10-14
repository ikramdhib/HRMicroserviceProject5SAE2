package tn.esprit.com.msgestproject.Repsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.com.msgestproject.Entities.Projet;
import tn.esprit.com.msgestproject.Entities.Status;
import tn.esprit.com.msgestproject.Entities.Tache;
import tn.esprit.com.msgestproject.Entities.Utilisateur;

import java.util.List;

public interface TacheRepository extends JpaRepository<Tache,Integer> {

    List<Tache> findByStatusLike(Status status);

    List<Tache> findByProjetId(int projetId);

    List<Tache> findByUser_IdAndProjet_Id(int userId, int projetId);
}
