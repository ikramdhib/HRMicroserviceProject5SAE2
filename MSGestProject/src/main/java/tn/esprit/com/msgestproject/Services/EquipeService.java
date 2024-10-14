package tn.esprit.com.msgestproject.Services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import tn.esprit.com.msgestproject.Entities.Equipe;
import tn.esprit.com.msgestproject.Entities.Utilisateur;
import tn.esprit.com.msgestproject.Repsitories.EquipeRepository;
import tn.esprit.com.msgestproject.Repsitories.UtilisateurRepository;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
@Slf4j
public class EquipeService implements IEquipe{

    private EquipeRepository equipeRepository;
    public UtilisateurRepository utilisateurRepository;


    public Utilisateur addUser(Utilisateur utilisateur){
        return utilisateurRepository.save(utilisateur);
    }
    @Override
    public Equipe addEquipe(Equipe equipe ) {
        log.info(equipe.toString());
        return equipeRepository.save( equipe);
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
        return equipeRepository.findAll();
    }

    @Override
    public Equipe getOneById(int id) {
        return equipeRepository.findById(id).orElse(null);
    }


    public List<Utilisateur> getAllUser (){
     return utilisateurRepository.findAll();
    }

    @Override
    public List<Equipe> getEquipesByUserId(int userId) {
        List<Equipe> equipes = equipeRepository.findAll();

        // Use Java Stream to filter and collect all teams that include the user
        List<Equipe> userEquipes = equipes.stream()
                .filter(equipe -> equipe.getUsers().stream().anyMatch(user -> user.getId() == userId))
                .collect(Collectors.toList());

        // Return the list of teams
        return userEquipes;
    }
}
