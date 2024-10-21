package tn.esprit.coursservice.repository;

import tn.esprit.coursservice.model.Cours;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursRepository extends JpaRepository<Cours, Long> {
}