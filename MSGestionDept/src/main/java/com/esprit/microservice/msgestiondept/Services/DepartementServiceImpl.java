package com.esprit.microservice.msgestiondept.Services;

import com.esprit.microservice.msgestiondept.Entities.Department;
import com.esprit.microservice.msgestiondept.Entities.Utilisateur;
import com.esprit.microservice.msgestiondept.Repositories.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartementServiceImpl implements DepartementService {

    @Autowired
    private DepartementRepository departementRepository;
    @Autowired
    private UserClient userClient;
    @Override
    public Department creerDepartement(Department department) {
        department.setCreatedDate(new Date()); // Set current date for createdDate
        return departementRepository.save(department);
    }

    @Override
    public Optional<Department> getDepartementById(Long id) {
        return departementRepository.findById(id);
    }

    @Override
    public List<Department> getAllDepartements() {
        return departementRepository.findAll();
    }

    @Override
    public Department updateDepartement(Long id, Department departmentDetails) {
        Department department = departementRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Département non trouvé"));

        department.setNom(departmentDetails.getNom());
        department.setDescription(departmentDetails.getDescription());
        department.setType(departmentDetails.getType());
        department.setStatus(departmentDetails.getStatus()); // Update status
        department.setImageUrl(departmentDetails.getImageUrl()); // Update image URL
        department.setLocation(departmentDetails.getLocation()); // Update location
        department.setBudget(departmentDetails.getBudget()); // Update budget
        department.setManager(departmentDetails.getManager()); // Update manager
        department.setNumberOfEmployees(departmentDetails.getNumberOfEmployees()); // Update number of employees

        department.setUtilisateurs(departmentDetails.getUtilisateurs());

        return departementRepository.save(department);
    }

    @Override
    public void deleteDepartement(Long id) {
        departementRepository.deleteById(id);
    }

   @Override
    public List<Utilisateur> getUsersByDepartmentId(Long departmentId) {
        // Récupération du département
       Department department = departementRepository.findById(departmentId).orElse(null);

       // Liste des IDs des utilisateurs associés
       List<Integer> userIds = department.getUtilisateurs();

       if (userIds == null || userIds.isEmpty()) {
           throw new RuntimeException("No users are associated with this department");
       }

       // Récupération des utilisateurs via Feign
       List<Utilisateur> utilisateurs = userIds.stream()
               .map(userId -> {
                   try {
                       // Appel au service Feign pour chaque utilisateur
                       return userClient.getUserById(userId);
                   } catch (Exception e) {
                       // Gestion des exceptions si un utilisateur ne peut pas être récupéré
                       throw new RuntimeException("Error fetching user with ID: " + userId, e);
                   }
               })
               .map(user -> {
                   // Mapping vers le DTO
                   Utilisateur dto = new Utilisateur();
                   dto.setId(user.getId());
                   dto.setUsername(user.getUsername());
                   dto.setEmail(user.getEmail());
                   dto.setPhone(user.getPhone());
                   dto.setCin(user.getCin());
                   return dto;
               })
               .collect(Collectors.toList());

       return utilisateurs;
   }

    @Override
    @Transactional
    public Department addDepartmentAndAssignToUsers(Department department, List<Integer> userIds) {
       department.setUtilisateurs(userIds);

        return departementRepository.save(department);
    }



}