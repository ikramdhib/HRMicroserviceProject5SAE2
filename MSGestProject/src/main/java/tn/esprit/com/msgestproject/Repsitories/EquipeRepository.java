package tn.esprit.com.msgestproject.Repsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.com.msgestproject.Entities.Equipe;

import java.util.List;

public interface EquipeRepository extends JpaRepository<Equipe,Integer> {

    List<Equipe> findByResponsable_id(int id);



}
