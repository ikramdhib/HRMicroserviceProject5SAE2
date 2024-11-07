package tn.esprit.com.msgestproject.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.com.msgestproject.Entities.Status;
import tn.esprit.com.msgestproject.Entities.Tache;
import tn.esprit.com.msgestproject.Entities.Utilisateur;
import tn.esprit.com.msgestproject.Repsitories.TacheRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@Service
public class TacheService implements ITache {
    private TacheRepository tacheRepository;
    private final UserClient userClient; // Feign client pour interagir avec le microservice utilisateur

    @Override
    public Tache addTache(Tache tache) {
        return tacheRepository.save(tache);
    }

    @Override
    public List<Tache> getAllTaches() {
        return tacheRepository.findAll();
    }

    @Override
    public Tache getOneTache(int id) {
        return tacheRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteTache(int id) {
        tacheRepository.deleteById(id);
    }

    @Override
    public Tache updateTache(Tache tache) {
        return tacheRepository.save(tache);
    }

    @Override
    public List<Tache> getTacheWithStatus(Status status) {
        return tacheRepository.findByStatusLike(status);
    }

    @Override
    public List<Tache> getAllById(List<Integer> integers) {
        // Récupérer toutes les tâches avec les IDs donnés
        List<Tache> taches = tacheRepository.findAllById(integers);

        // Pour chaque tâche, récupérer l'utilisateur lié par userId
        for (Tache tache : taches) {
            // Utiliser le UserClient pour récupérer les informations de l'utilisateur par userId
            Utilisateur utilisateur = userClient.getUserById(tache.getUserId());

            // Ajouter les informations utilisateur à la tâche, par exemple en l'affichant dans un champ ou en ajoutant un DTO
            tache.setUtilisateur(utilisateur);  // Si vous avez un setter pour cet attribut, sinon créez-le
        }

        return taches;

    }


    @Override
    public List<Tache> getAllByProjectId(int id) {
        List<Tache> taches = tacheRepository.findByProjetId(id);  // Récupérer les tâches du projet

        // Pour chaque tâche, récupérer les détails de l'utilisateur par son userId
        for (Tache tache : taches) {
            if (tache.getUserId() != 0) {
                // Appeler le service UserClient pour récupérer les détails de l'utilisateur
                Utilisateur utilisateur = userClient.getUserById(tache.getUserId());
                tache.setUtilisateur(utilisateur);  // Ajouter les détails de l'utilisateur à la tâche
            }
        }

        return taches;
    }

    @Override
    public List<Tache> getAllTcahesWithUserIdAndProjectId(int userId, int projetId) {
        return tacheRepository.findByUserIdAndProjet_Id(userId,projetId);
    }

    @Override
    public Tache updateStatus(int id, Status status) {
        Tache tache = tacheRepository.findById(id).orElse(null);
        tache.setStatus(status);
        return tacheRepository.save(tache);
    }
    @Override
    public Tache assignUserToTask(int tacheId, int userId) {
        Tache tache = tacheRepository.findById(tacheId).orElse(null);
        if (tache != null) {
            Utilisateur utilisateur = userClient.getUserById(userId);
            if (utilisateur != null) {
                tache.setUserId(userId);
                return tacheRepository.save(tache);
            }
        }
        return null;
    }
}
