package tn.esprit.recruitmentms.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.io.Serializable;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString

public class Demande implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    Long idDem;

    @NotNull
    String fullName;
    @Email
    String email;
    String phone;
    String skills;
    Integer nbExp;
    String cvPath;
    String coverLetterPath;
    @Enumerated(EnumType.STRING)
    private Etat etat;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    private JobOffer jobOffer;




}
