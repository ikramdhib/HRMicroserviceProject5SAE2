package tn.esprit.com.msgestproject.Repsitories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import tn.esprit.com.msgestproject.Entities.Projet;

import java.util.List;

public interface ProjetRepository extends JpaRepository<Projet,Integer> {
    @Query("SELECT p FROM Projet p JOIN p.equipe e JOIN e.users u WHERE u.id = :userId")
    List<Projet> findProjetsByUserId(@Param("userId") int userId);

}
