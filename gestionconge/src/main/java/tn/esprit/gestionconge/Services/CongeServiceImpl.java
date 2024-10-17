package tn.esprit.gestionconge.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import tn.esprit.gestionconge.Entities.Conge;
import tn.esprit.gestionconge.Entities.Utilisateur;
import tn.esprit.gestionconge.Repositories.ICongeRepository;
import tn.esprit.gestionconge.Repositories.IUtilisateurRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CongeServiceImpl implements IServiceConge{
    private IUtilisateurRepository utilisateurRepository;
    private ICongeRepository congeRepository;
    @Override
    public Conge addConge(Conge conge) {
        Optional<Utilisateur> optionalUtilisateur = utilisateurRepository.findById(1);
        // Vérifiez si l'utilisateur existe
        if (optionalUtilisateur.isPresent()) {
            conge.setUtilisateur(optionalUtilisateur.get()); // Lier l'utilisateur au congé
            conge.setDateDemande(LocalDate.now());
            return congeRepository.save(conge);
        } else {
            throw new RuntimeException("Utilisateur non trouvé avec l'ID 1");
        }
    }

    @Override
    public Conge updateConge(Conge conge) {
        return congeRepository.save(conge);
    }

    @Override
    public List<Conge> getAllConges() {
        return congeRepository.findAll();
    }

    @Override
    public void deleteConge(int congeId) {
        congeRepository.deleteById(congeId);
    }
}
