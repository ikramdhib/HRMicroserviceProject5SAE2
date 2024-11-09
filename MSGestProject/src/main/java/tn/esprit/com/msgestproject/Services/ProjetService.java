package tn.esprit.com.msgestproject.Services;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.com.msgestproject.Entities.Equipe;
import tn.esprit.com.msgestproject.Entities.Projet;
import tn.esprit.com.msgestproject.Entities.Utilisateur;
import tn.esprit.com.msgestproject.Repsitories.ProjetRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProjetService implements IProjet{
    private ProjetRepository projetRepository;
    private final UserClient userClient;
    @Override
    public Projet saveProjet(Projet projet) {
        return projetRepository.save(projet);
    }

    @Override
    public Projet getprojetById(int id) {
        return projetRepository.findById(id).orElse(null);
    }

    @Override
    public List<Projet> getAllProjets() {
        List<Projet> projets = projetRepository.findAll();
        List<Projet> projetDTOs = new ArrayList<>();

        for (Projet projet : projets) {
            Projet projetDTO = new Projet();
            projetDTO.setId(projet.getId());
            projetDTO.setTitre(projet.getTitre());
            projetDTO.setDetailles(projet.getDetailles());
            projetDTO.setDateDebut(projet.getDateDebut());
            projetDTO.setDateFin(projet.getDateFin());
            projetDTO.setEquipe(projet.getEquipe());

            // Récupérer le responsable de l'équipe associée au projet
            Equipe equipe = projet.getEquipe();  // Assurez-vous que l'équipe est bien récupérée avec le projet
            if (equipe != null) {
                Utilisateur responsable = userClient.getUserById(equipe.getResponsableId());
                projetDTO.setResponsable(responsable);  // Assignation du responsable à DTO
            }

            projetDTOs.add(projetDTO);
        }

        return projetDTOs;
    }


    @Override
    public Projet updateProjet(Projet projet) {
        return projetRepository.save( projet);
    }

    @Override
    public void deleteProjet(int id) {
        projetRepository.deleteById(id);
    }

    @Override
    public List<Projet> getProjetsByUserId(int userId) {
        List<Projet> projets = projetRepository.findProjetsByUserId(userId);

        for (Projet projet : projets) {
            // Récupérer l'ID du responsable de l'équipe
            int responsableId = projet.getEquipe().getResponsableId();

            // Utiliser UserClient pour récupérer le responsable par son ID
            Utilisateur responsable = userClient.getUserById(responsableId);

            // Convertir l'utilisateur en UserDTO
            Utilisateur responsableDTO = new Utilisateur();
            responsableDTO.setId(responsable.getId());
            responsableDTO.setUsername(responsable.getUsername());
            responsableDTO.setEmail(responsable.getEmail());
            responsableDTO.setPhone(responsable.getPhone());

            // Assigner l'objet UserDTO au projet
            projet.setResponsable(responsableDTO);
        }

        return projets;
    }
    public long countProjects() {
        return projetRepository.count();
    }

    public Map<String, Long> getProjectsDistributionByStartDate() {
        List<Projet> projets = projetRepository.findAll(); // Récupère tous les projets

        // Regroupement des projets par année-mois (format: yyyy-MM)
        return projets.stream()
                .collect(Collectors.groupingBy(projet -> {
                    // Formater la date de début pour extraire l'année et le mois
                    return String.format("%tY-%<tm", projet.getDateDebut());
                }, Collectors.counting()));
    }



}
