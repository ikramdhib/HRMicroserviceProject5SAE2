package tn.esprit.com.msgestproject.Services;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import tn.esprit.com.msgestproject.Entities.Utilisateur;

import java.util.List;

@FeignClient(name = "MSExpressService")
public interface UserClient {

    @RequestMapping("users/")
    public List<Utilisateur> getAllJobs();
    @RequestMapping("users/{id}")
    public Utilisateur getJobById(@PathVariable int id);

}
