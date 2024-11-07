package com.esprit.microservice.msgestiondept.Services;


import com.esprit.microservice.msgestiondept.Entities.Department;

import java.util.List;
import java.util.Optional;

public interface DepartementService {

    // Créer un nouveau département
    Department creerDepartement(Department department);

    // Obtenir un département par son ID
    Optional<Department> getDepartementById(Long id);

    // Obtenir tous les départements
    List<Department> getAllDepartements();

    // Mettre à jour un département
    Department updateDepartement(Long id, Department departmentDetails);

    // Supprimer un département
    void deleteDepartement(Long id);


}
