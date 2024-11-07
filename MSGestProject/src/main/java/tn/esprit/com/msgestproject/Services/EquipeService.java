package tn.esprit.com.msgestproject.Services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.esprit.com.msgestproject.Entities.Equipe;
import tn.esprit.com.msgestproject.Entities.Utilisateur;
import tn.esprit.com.msgestproject.Repsitories.EquipeRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
@Slf4j
public class EquipeService implements IEquipe {

    private final EquipeRepository equipeRepository; // Repository pour gérer les équipes
    private final UserClient userClient; // Feign client pour interagir avec le microservice utilisateur

    @Override
    public Equipe addEquipe(Equipe equipe) {
        log.info("Ajout de l'équipe : {}", equipe);
        return equipeRepository.save(equipe);
    }

    @Override
    public Equipe updateEquipe(Equipe equipe) {
        return equipeRepository.save(equipe);
    }

    @Override
    public void deleteEquipe(int id) {
        equipeRepository.deleteById(id);
    }

    @Override
    public List<Equipe> getAllEquipes() {
        List<Equipe> equipes = equipeRepository.findAll();
        List<Equipe> equipeDTOs = new ArrayList<>();

        for (Equipe equipe : equipes) {
            Equipe equipeDTO = new Equipe();
            equipeDTO.setId(equipe.getId());
            equipeDTO.setTitre(equipe.getTitre());

            // Récupérer le responsable
            Utilisateur responsable = userClient.getUserById(equipe.getResponsableId());
            equipeDTO.setResponsable(responsable);

            // Récupérer les membres
            List<Utilisateur> membres = new ArrayList<>();
            for (Integer userId : equipe.getUserIds()) {
                Utilisateur membre = userClient.getUserById(userId);
                membres.add(membre);
            }
            equipeDTO.setMembers(membres);

            equipeDTOs.add(equipeDTO);
        }

        return equipeDTOs;
    }


    @Override
    public Equipe getOneById(int id) {
        return equipeRepository.findById(id).orElse(null);
    }

    public Equipe assignUsersToEquipe(int equipeId, Set<Integer> userIds) {
        Equipe equipe = equipeRepository.findById(equipeId)
                .orElseThrow(() -> new RuntimeException("Équipe introuvable avec ID : " + equipeId));
        equipe.setUserIds(userIds); // Ajout des IDs des utilisateurs dans l'équipe
        return equipeRepository.save(equipe);
    }

    public List<Utilisateur> getUsersByEquipe(int equipeId) {
        Equipe equipe = equipeRepository.findById(equipeId)
                .orElseThrow(() -> new RuntimeException("Équipe introuvable avec ID : " + equipeId));
        return equipe.getUserIds().stream()
                .map(userClient::getUserById) // Appel au microservice utilisateur via Feign pour chaque ID
                .collect(Collectors.toList());
    }

    @Override
    public List<Equipe> getEquipesByUserId(int userId) {
        // Récupérer toutes les équipes
        List<Equipe> equipes = equipeRepository.findAll();
        List<Equipe> equipeDTOs = new ArrayList<>();

        for (Equipe equipe : equipes) {
            // Vérifiez si l'utilisateur est dans l'équipe (soit comme responsable, soit comme membre)
            if (equipe.getResponsableId() == userId || equipe.getUserIds().contains(userId)) {
                Equipe equipeDTO = new Equipe();
                equipeDTO.setId(equipe.getId());
                equipeDTO.setTitre(equipe.getTitre());

                // Récupérer le responsable
                Utilisateur responsable = userClient.getUserById(equipe.getResponsableId());
                Utilisateur responsableDTO = new Utilisateur();
                responsableDTO.setId(responsable.getId());
                responsableDTO.setUsername(responsable.getUsername());
                responsableDTO.setEmail(responsable.getEmail());
                responsableDTO.setPhone(responsable.getPhone());
                equipeDTO.setResponsable(responsableDTO);

                // Récupérer les membres de l'équipe en utilisant les userIds
                List<Utilisateur> membresDTO = new ArrayList<>();
                if (equipe.getUserIds() != null) {
                    for (Integer id : equipe.getUserIds()) {
                        Utilisateur membre = userClient.getUserById(id);  // Récupérer chaque utilisateur
                        Utilisateur membreDTO = new Utilisateur();
                        membreDTO.setId(membre.getId());
                        membreDTO.setUsername(membre.getUsername());
                        membreDTO.setEmail(membre.getEmail());
                        membreDTO.setPhone(membre.getPhone());
                        membresDTO.add(membreDTO);
                    }
                }

                equipeDTO.setMembers(membresDTO);
                equipeDTOs.add(equipeDTO);
            }
        }

        return equipeDTOs;

    }
}
