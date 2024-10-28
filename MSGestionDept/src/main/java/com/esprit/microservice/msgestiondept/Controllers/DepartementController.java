package com.esprit.microservice.msgestiondept.Controllers;

import com.esprit.microservice.msgestiondept.Entities.Department;
import com.esprit.microservice.msgestiondept.Services.DepartementService;
import com.esprit.microservice.msgestiondept.Services.DepartementServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping("/api/departements")
@AllArgsConstructor
public class DepartementController {
    @Autowired
    private DepartementService departementService;
    // Créer un département (POST)
    @PostMapping
    public ResponseEntity<Department> creerDepartement(@RequestBody Department departement) {
        Department nouveauDepartement = departementService.creerDepartement(departement);
        return ResponseEntity.ok(nouveauDepartement);
    }
    // New endpoint for image upload

    // Obtenir un département par ID (GET)
    @GetMapping("/{id}")
    public ResponseEntity<Department> getDepartementById(@PathVariable Long id) {
        Optional<Department> departement = departementService.getDepartementById(id);
        return departement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Obtenir tous les départements (GET)
    @GetMapping
    public List<Department> getAllDepartements() {
        return departementService.getAllDepartements();
    }

    // Mettre à jour un département par ID (PUT)
    @PutMapping("/{id}")
    public ResponseEntity<Department> updateDepartement(@PathVariable Long id, @RequestBody Department departementDetails) {
        Department updatedDepartement = departementService.updateDepartement(id, departementDetails);
        return ResponseEntity.ok(updatedDepartement);
    }

    // Supprimer un département par ID (DELETE)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartement(@PathVariable Long id) {
        departementService.deleteDepartement(id);
        return ResponseEntity.noContent().build();
    }
}
