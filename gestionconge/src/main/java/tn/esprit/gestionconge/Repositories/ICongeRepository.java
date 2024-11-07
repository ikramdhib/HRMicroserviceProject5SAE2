package tn.esprit.gestionconge.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;
import tn.esprit.gestionconge.Entities.Conge;

public interface ICongeRepository extends JpaRepository<Conge,Integer> {
}
