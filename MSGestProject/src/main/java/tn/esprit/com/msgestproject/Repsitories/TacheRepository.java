package tn.esprit.com.msgestproject.Repsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.com.msgestproject.Entities.Tache;

public interface TacheRepository extends JpaRepository<Tache,Integer> {
}
