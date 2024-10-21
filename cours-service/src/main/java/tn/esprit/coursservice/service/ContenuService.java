package tn.esprit.coursservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.coursservice.model.Contenu;
import tn.esprit.coursservice.repository.ContenuRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ContenuService {
    @Autowired
    private ContenuRepository contenuRepository;

    public List<Contenu> findAll() {
        return contenuRepository.findAll();
    }

    public Optional<Contenu> findById(Long id) {
        return contenuRepository.findById(id);
    }

    public Contenu save(Contenu contenu) {
        return contenuRepository.save(contenu);
    }

    public void deleteById(Long id) {
        contenuRepository.deleteById(id);
    }
}
