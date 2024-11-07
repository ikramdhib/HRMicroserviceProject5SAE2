package com.esprit.microservice.msgestiondept.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Department implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String description;

    @Enumerated(EnumType.STRING)
    private DepartementType type;

    @Enumerated(EnumType.STRING)
    private Status status; // For department status (e.g., ACTIVE, INACTIVE)

    private String imageUrl; // URL to store department image

    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate; // To track the creation time of the department

    private String location; // To store the department location

    private Double budget; // To store department budget

    private String manager; // Department manager's name

    private Integer numberOfEmployees; // To store the number of employees

  @ElementCollection
    private List<Integer> utilisateurs; // Ensure this references the correct field in Utilisateur
}
