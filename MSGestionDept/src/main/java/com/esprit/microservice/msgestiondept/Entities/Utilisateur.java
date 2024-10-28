package com.esprit.microservice.msgestiondept.Entities;


import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Utilisateur implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String nomComplet;
    private String email;

    @ManyToOne
    @JoinColumn(name = "department_id") // This creates a foreign key in Utilisateur table
    private Department department; // Ensure this matches the field in Department
}
