package tn.esprit.gestionconge.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Conge implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String type;
    private LocalDate date_debut;
    private LocalDate date_fin;
    private int duree;
    @Enumerated(EnumType.STRING)
    private Status statut;
    private String raison;
    private LocalDate dateDemande;
    @JsonIgnore
    @ManyToOne
    private Utilisateur utilisateur;

}
