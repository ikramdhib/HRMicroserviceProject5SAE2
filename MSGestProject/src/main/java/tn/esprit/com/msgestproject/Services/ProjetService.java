package tn.esprit.com.msgestproject.Services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.com.msgestproject.Entities.Projet;
import tn.esprit.com.msgestproject.Repsitories.ProjetRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjetService implements IProjet{
    private ProjetRepository projetRepository;
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
        return projetRepository.findAll();
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
        return projetRepository.findProjetsByUserId(userId);
    }
}
