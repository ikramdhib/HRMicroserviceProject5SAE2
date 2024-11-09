package tn.esprit.gestionconge.Services;

import lombok.AllArgsConstructor;
import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import tn.esprit.gestionconge.Entities.Conge;
import tn.esprit.gestionconge.Entities.Status;
import tn.esprit.gestionconge.Entities.Utilisateur;
import tn.esprit.gestionconge.Repositories.ICongeRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CongeServiceImpl implements IServiceConge{
    private ICongeRepository congeRepository;
    private UserClient userClient;
    @Override
    public Conge addConge(Conge conge,int id) {
        Utilisateur optionalUtilisateur = userClient.getUserById(id);
        // Vérifiez si l'utilisateur existe
        if (optionalUtilisateur!=null) {
            conge.setId(optionalUtilisateur.getId()); // Lier l'utilisateur au congé
            conge.setDateDemande(LocalDate.now());
            conge.setStatut(Status.EnCours);

            return congeRepository.save(conge);
        } else {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID 1");
        }
    }

    @Override
    public Conge updateConge(Conge conge) {
        Optional<Conge> existingConge = congeRepository.findById(conge.getId());
        if (existingConge.isPresent()) {
            // Mettre à jour les détails du congé
            Conge updatedConge = existingConge.get();
            updatedConge.setType(conge.getType());
            updatedConge.setDate_debut(conge.getDate_debut());
            updatedConge.setDate_fin(conge.getDate_fin());
            updatedConge.setDuree(conge.getDuree());
            updatedConge.setRaison(conge.getRaison());
            // Enregistrer le congé mis à jour dans la base de données
            return congeRepository.save(updatedConge);
        } else {
            throw new RuntimeException("Congé non trouvé avec l'ID: " + conge.getId());
        }

    }

    @Override
    public List<Conge> getAllConges() {
        return congeRepository.findAll();
    }

    @Override
    public void deleteConge(int congeId) {
        congeRepository.deleteById(congeId);
    }

    @Override
    public Conge updateStatusConge(int congeId, Status statut) {
        Optional<Conge> optionalConge = congeRepository.findById(congeId);
        if (optionalConge.isPresent()) {
            Conge conge = optionalConge.get();
            conge.setStatut(statut);
            return congeRepository.save(conge);
        } else {
            throw new RuntimeException("Congé non trouvé avec l'ID: " + congeId);
        }
    }
}
