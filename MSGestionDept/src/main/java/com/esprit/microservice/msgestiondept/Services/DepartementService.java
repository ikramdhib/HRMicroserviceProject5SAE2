package com.esprit.microservice.msgestiondept.Services;



import com.esprit.microservice.msgestiondept.Entities.Department;
import com.esprit.microservice.msgestiondept.Entities.Utilisateur;

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

    public List<Utilisateur> getUsersByDepartmentId(Long departmentId);

  //  public List<Utilisateur> getAllUsers();
    //public Department creerDepartementWithUsers(Department department, List<Long> userIds);

    public Department addDepartmentAndAssignToUsers(Department department, List<Integer> userIds) ;

    //public List<Utilisateur> getUsersByDepartment(Long departmentId) ;

}
