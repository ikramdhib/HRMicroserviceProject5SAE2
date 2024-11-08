package tn.esprit.recruitmentms.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.recruitmentms.entities.Demande;
import tn.esprit.recruitmentms.entities.Etat;
import tn.esprit.recruitmentms.entities.JobOffer;
import tn.esprit.recruitmentms.entities.Status;
import tn.esprit.recruitmentms.exceptions.ResourceNotFoundException;
import tn.esprit.recruitmentms.repositories.IDemandeRepository;
import tn.esprit.recruitmentms.repositories.IJobOfferRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;


@Service
@AllArgsConstructor

public class DemandeServiceImpl implements IDemandeService{
    private IDemandeRepository iDemandeRepository;
    private IJobOfferRepository iJobOfferRepository;
    private final String uploadDir = "C:/Users/Marye/Desktop/upload";


    public Demande createDemande(Demande demande, MultipartFile file, MultipartFile coverLetterFile) throws IOException {
        // Save CV file if present
        if (file != null && !file.isEmpty()) {
            String cvPath = saveFile(file);
            demande.setCvPath(cvPath);
        }

        // Save Cover Letter file if present
        if (coverLetterFile != null && !coverLetterFile.isEmpty()) {
            String coverLetterPath = saveFile(coverLetterFile);
            demande.setCoverLetterPath(coverLetterPath);
        }

        // Save Demande to the database
        return iDemandeRepository.save(demande);
    }

    // Utility method to save file
    private String saveFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.createDirectories(filePath.getParent());
        Files.write(filePath, file.getBytes());
        return filePath.toString();
    }

    public Demande retrieveDemande(Long idDem) {
        return iDemandeRepository.findById(idDem).orElse(null);
    }

    @Override
    public Demande updateDemande(Long idDem, Demande updatedDemande) {
        Optional<Demande> optionalDemande = iDemandeRepository.findById(idDem);
        if (optionalDemande.isPresent()) {
            Demande demande = optionalDemande.get();
            demande.setFullName(updatedDemande.getFullName());
            demande.setEmail(updatedDemande.getEmail());
            demande.setPhone(updatedDemande.getPhone());
            demande.setSkills(updatedDemande.getSkills());
            demande.setNbExp(updatedDemande.getNbExp());
            demande.setEtat(updatedDemande.getEtat());
            demande.setStatus(updatedDemande.getStatus());
            demande.setCvPath(updatedDemande.getCvPath());
            demande.setCoverLetterPath(updatedDemande.getCoverLetterPath());
            demande.setJobOffer(updatedDemande.getJobOffer());
            return iDemandeRepository.save(demande);
        } else {
            throw new RuntimeException("Demande not found with id: " + idDem);
        }
    }

    @Override
    public List<Demande> getDemandeByJobId(Long idJob) {
        return iDemandeRepository.findByJobOffer_IdJob(idJob);
    }


    @Override
    public void deleteDemande(Long idDem) {
        if (!iDemandeRepository.existsById(idDem)) {
            throw new ResourceNotFoundException("Demande", idDem);
        }
        iDemandeRepository.deleteById(idDem);
    }

    @Override
    public void filterAndUpdateDemande() {
        List<Demande> demandes = iDemandeRepository.findAll();

        for (Demande demande : demandes) {
            if (demande.getEtat() == Etat.RECEIVED && demande.getStatus() == Status.Nothing) {
                Optional<JobOffer> optionalJobOffer = iJobOfferRepository.findById(demande.getJobOffer().getIdJob());
                if (optionalJobOffer.isPresent()) {
                    JobOffer jobOffer = optionalJobOffer.get();

                    // Vérifier si le nombre d'expériences est différent et inférieur à celui de l'offre d'emploi
                    if (demande.getNbExp() != jobOffer.getNbreExperience().intValue() && (demande.getNbExp() < jobOffer.getNbreExperience().intValue())){
                        demande.setEtat(Etat.REJECTED);
                        demande.setStatus(Status.NOT_HIRED); // Status becomes NotTirer
                    } else {
                        // Comparer les compétences
                        double similarityPercentage = calculateSkillsSimilarity(demande.getSkills(), jobOffer.getCompetence());
                        if (similarityPercentage >= 80.0) {
                            demande.setEtat(Etat.ACCEPTED);
                            demande.setStatus(Status.HIRED); // Status becomes Tirer
                        } else {
                            demande.setEtat(Etat.REJECTED);
                            demande.setStatus(Status.NOT_HIRED); // Status becomes NotTirer
                        }
                    }
                    iDemandeRepository.save(demande); // Sauvegarder les modifications
                }
            }
        }
    }



    private double calculateSkillsSimilarity(String demandeSkills, String jobOfferSkills) {
        // Logique pour comparer les compétences et calculer le pourcentage de similarité
        // Pour une mise en œuvre simple, nous allons utiliser la correspondance des sous-chaînes
        String[] demandeSkillsArray = demandeSkills.split(","); // Suppose que les compétences sont séparées par des virgules
        String[] jobOfferSkillsArray = jobOfferSkills.split(",");

        int matchedSkills = 0;
        for (String demandeSkill : demandeSkillsArray) {
            for (String jobOfferSkill : jobOfferSkillsArray) {
                if (demandeSkill.trim().equalsIgnoreCase(jobOfferSkill.trim())) {
                    matchedSkills++;
                    break;
                }
            }
        }

        // Calculer le pourcentage de similarité
        double totalSkills = demandeSkillsArray.length + jobOfferSkillsArray.length;
        if (totalSkills == 0) return 0.0; // Eviter la division par zéro
        return (matchedSkills / totalSkills) * 100; // Renvoie le pourcentage de similarité
    }

}
