package com.esprit.microservice.msgestiondept.Repositories;

import com.esprit.microservice.msgestiondept.Entities.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartementRepository extends JpaRepository<Department, Long> {
    // Méthode pour trouver un département par son nom
    Department findByNom(String nom);
}