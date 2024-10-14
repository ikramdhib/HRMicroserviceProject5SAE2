import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ProjetService } from '../Services/projet.service';
import { Validators } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { TachesService } from '../Services/taches.service';
import { ConfirmationService,MessageService } from 'primeng/api';
@Component({
  selector: 'app-add-taches',
  templateUrl: './add-taches.component.html',
  styleUrls: ['./add-taches.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class AddTachesComponent implements OnInit {
  tacheForm!: FormGroup;
  dropdownItems: any[] = []; // Projects dropdown items
  routeItems!: MenuItem[];   // Stepper steps
  pageIndex: number = 0;     // Tracks the current step
  selectedProject: any;      // Selected project
  members: any[] = [];       // Members of the selected project
  selectedMember: any;       // Selected member
  submit:boolean=false;
  member:any[]=[];
  tachesIDS:any[]=[];
  tacheList:any[]=[]
  constructor(private messageService: MessageService,private tacheService :TachesService, private projetService: ProjetService,private fb: FormBuilder) {}

  ngOnInit() {
    // Define steps for the stepper
    this.routeItems = [
      { label: 'Choisir un projet' },
      { label: 'Définir taches' },
      { label: 'Confirmation' }
    ];

    

    
    this.tacheForm = this.fb.group({
      titre: ['',Validators.required ],
      detail: ['',Validators.required ],
      user:[null,Validators.required ],
     projet:[null,Validators.required ]
    });

    // Load all projects into the dropdown
    this.getAllProjects();
  }

  get form() {
    return this.tacheForm.controls;
  }

  // Get all projects for dropdown
  getAllProjects() {
    this.projetService.getAllProject().subscribe({
      next: (res) => {
        this.dropdownItems = res; // Populate dropdown with projects
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }

  // Handle project selection
  onProjectSelect(selectedProjectId: any) {
    this.pageIndex = 1;
    this.getProjectDetails(selectedProjectId);
  }

  // Get the selected project details (including members)
  getProjectDetails(id: any) {
    this.projetService.getOneProject(id).subscribe({
      next: (res) => {
        
        this.members = res.equipe.users;  // Assuming `members` is a list in the project response
      },
      error: (err) => {
        console.error('Error fetching project details:', err);
      }
    });
  }

  nextStep() {
    if (this.pageIndex < this.routeItems.length - 1) {
      this.pageIndex++;
      this.getallById(this.tachesIDS);
    }
  }

  // Handle step change event
  onStepChange(event: any) {
   
    this.pageIndex = event.index;  // Update current step index
  }

  submitTache(){
    this.submit=true

    if(this.tacheForm.valid){
      const newTache={
        titre:this.tacheForm.value.titre,
        detail:this.tacheForm.value.detail,
        user:this.selectedMember,
        projet:this.selectedProject,
        status:"PLANIFIER"
      }

      this.tacheService.addTache(newTache).subscribe({
        next:(res)=>{
          this.tachesIDS.push(res.id);
          console.log(res)
        },
        error:(error)=>{
          this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });
            
          console.log(error)
        },
        complete:()=>{
          this.messageService.add({ severity: 'info', summary: 'Confirmer', detail: 'le projet est ajouté avec succés' });
          // Réinitialiser le formulaire

          // Réinitialiser seulement le membre sélectionné
          this.selectedMember = null; // Réinitialisez le membre sélectionné

          // Si vous avez des validations sur d'autres champs, vous pouvez également les réinitialiser
          this.form['titre'].setValue(null);
          this.form['detail'].setValue(null);
          // Si vous avez des validations sur d'autres champs, vous pouvez également les réinitialiser
         
          this.submit = false; // Réinitialiser l'état d
        
        }
      })
    }

  }

  getallById(integers:any[]){
    this.tacheService.getallByIDs(integers).subscribe({
      next:(res)=>{
        this.tacheList = res;
      }
    })
  }
}
