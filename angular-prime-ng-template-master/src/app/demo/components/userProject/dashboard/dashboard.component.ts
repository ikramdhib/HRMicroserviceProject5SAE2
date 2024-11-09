import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProjetService } from '../../projectManagment/Services/projet.service';
import { EquipeService } from '../../projectManagment/Services/equipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userCount: number = 0;
  roleDistribution: any[] = [];
  registrationStats: any[] = [];
  chartData: any;
  pieData: any;
  barOptions:any;
  chartDataBar:any;
  projectCount:any;
  equipeCount :any;

  constructor(private userService: UserService ,private equipeService :EquipeService, public projectService :ProjetService) {
    
  }
  

  ngOnInit() {
    this.fetchUserCount();
    this.fetchRoleDistribution();
    this.fetchRegistrationStats();
    this. fetchProjectDistribution();
    this.fetchProjectCount();
    this. fetchEquipeCount();
  }

  fetchUserCount() {
    this.userService.getUserCount().subscribe((res) => {
      this.userCount = res.count;
    });
  }
  fetchProjectCount() {
    this.projectService.getCountProject().subscribe((res) => {
      this.projectCount = res.count;
    });
  }
  fetchEquipeCount() {
    this.equipeService.getCountEquie().subscribe((res) => {
      this.equipeCount = res;
    });
  }
  fetchRoleDistribution() {
    this.userService.getRoleDistribution().subscribe((data) => {
      console.log('Role Distribution:', data); // Vérifiez les données retournées
      this.roleDistribution = data;
      this.pieData = {
        labels: this.roleDistribution.map((item) => item.role),
        datasets: [
          {
            data: this.roleDistribution.map((item) => item.count),
            backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'] // Ajoutez des couleurs selon le nombre de rôles
          }
        ]
      };
    });
  }


  fetchRegistrationStats() {
    this.userService.getRegistrationStats().subscribe({
      next: (response) => {
        console.log('Registration Stats:', response); // Log the entire response
        const data = response || [];
        if (Array.isArray(data) && data.length > 0) {
          this.registrationStats = data;
          console.log('Parsed Registration Stats:', this.registrationStats);  // Log the processed data
          // Preparing the data for the chart
          this.chartData = {
            labels: this.registrationStats.map((stat) => stat.month), // Months as labels
            datasets: [
              {
                label: 'Registrations',
                data: this.registrationStats.map((stat) => {
                  // Ensure count is a valid number
                  return isNaN(stat.count) ? 0 : stat.count;
                }),
                borderColor: '#42A5F5', // Line color
                fill: false // No fill under the curve
              }
            ]
          };
          console.log('Chart Data:', this.chartData);  // Log the chart data
        } else {
          console.error('Invalid or empty registration stats:', response);
        }
      },
      error: (err) => {
        console.error('Error fetching registration stats:', err);
      }
    });
  }

  fetchProjectDistribution(): void {
    this.projectService.getDistrubutedProject().subscribe({
      next: (data) => {
        console.log('Distribution des projetsyyyy:', data);  // Pour déboguer et vérifier les données

        // Extraire les mois et les comptes à partir des données
        const labels = Object.keys(data); // Les mois (yyyy-MM) seront utilisés comme labels
        const counts = Object.values(data); // Les comptes des projets pour chaque mois

        // Préparer les données pour le graphique à barres
        this.chartDataBar = {
          labels: labels, // Mois en labels
          datasets: [
            {
              label: 'Nombre de projets par mois',
              data: counts, // Nombre de projets par mois
              backgroundColor: '#42A5F5', // Couleur des barres
              borderColor: '#1E88E5', // Bordure des barres
              borderWidth: 1
            }
          ]
        };

        // Options du graphique à barres
        this.barOptions = {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mois'  // L'axe des X représente les mois
              }
            },
            y: {
              title: {
                display: true,
                text: 'Nombre de projets'  // L'axe des Y représente le nombre de projets
              }
            }
          }
        };
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données:', err); // Gestion des erreurs
      }
    });
  }
  
}
