import { Component, OnInit } from '@angular/core';
import { EquipeService } from '../Services/equipe.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProjetService } from '../Services/projet.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ConfirmationService,MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-projet',
  templateUrl: './add-projet.component.html',
  styleUrls: ['./add-projet.component.scss'],
  providers: [MessageService]
})
export class AddProjetComponent implements OnInit {

  equipes: any[] = []; 
  filteredEquipes: any[] = []; 
  selectedEquipe: any[] = []; 
  projetForm!: FormGroup;
  submit:boolean=false;
  constructor(  private messageService: MessageService,private projectService : ProjetService,private equipeServices: EquipeService , private fb: FormBuilder) {}

  ngOnInit() {
    this.projetForm = this.fb.group({
        titre:['',Validators.required ],
        description:['',Validators.required],
        startDate:['',Validators.required],
        findate:['',Validators.required],
        equipe:[''],
    })
    this.getEquipes();

  }

  get form() {
    return this.projetForm.controls;
  }
  filterEquipe(event: any) {
    const filtered: any[] = [];
    const query = event.query.toLowerCase();
    
    for (let i = 0; i < this.equipes.length; i++) {
      const equipe = this.equipes[i];
      
      // Vérifiez que la propriété 'name' existe et est une chaîne de caractères
      if (equipe && equipe.titre && typeof equipe.titre === 'string') {
        if (equipe.titre.toLowerCase().indexOf(query) === 0) {
          filtered.push(equipe);
        }
      }
    }
  
    this.filteredEquipes = filtered; // Mettre à jour les suggestions filtrées
  }

  getEquipes() {
    this.equipeServices.getAllEqupes().subscribe({
      next: (res) => {
        this.equipes = res; // Stocker les équipes récupérées
        console.log(".....",this.equipes);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des équipes:', err);
      }
    });
  }

  submitProjet(){
    this.submit = true;
    if(this.projetForm.valid){
      
    const newProject={
        titre:this.projetForm.value.titre,
        detailles:this.projetForm.value.description,
        dateDebut:this.projetForm.value.startDate,
        dateFin:this.projetForm.value.findate,
        equipe:this.selectedEquipe
    }
    this.projectService.addProject(newProject).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'le projet est ajouté avec succés' });
          
          console.log(res)
        },
        error:(error)=>{
           
          this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });
            
          console.log(error)
        }
    })
}
  }
}
