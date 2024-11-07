package com.esprit.microservice.msgestiondept.Services;

import com.esprit.microservice.msgestiondept.Entities.Department;
import com.esprit.microservice.msgestiondept.Repositories.DepartementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DepartementServiceImpl implements DepartementService {

    @Autowired
    private DepartementRepository departementRepository;

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
}
