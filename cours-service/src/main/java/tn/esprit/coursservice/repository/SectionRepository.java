package tn.esprit.coursservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tn.esprit.coursservice.model.Section;

public interface SectionRepository extends JpaRepository<Section, Long> {
}
