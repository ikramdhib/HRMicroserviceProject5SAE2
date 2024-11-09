import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../config/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    userRoles:any;
    constructor(private authService:AuthService ,public layoutService: LayoutService) { }

    ngOnInit() {

        const role = this.authService.getUserRoles();
        if (role) {
          
          this.userRoles = role 
        }
    

        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home',
                     routerLink: ['/user/dashboard'],
                     roles: ['ADMIN', 'HR','EMPLOYEE'] }
                ]
            },
            {
                items: [
                    {
                        label: 'Projets',
                        icon: 'pi pi-desktop',
                        items: [
                            {
                                label: 'Ajouter Projet',
                                icon: 'pi pi-plus',
                                routerLink: ['/projet/addprojet'],
                                roles: ['ADMIN', 'HR']
                            },
                            {
                                label: 'List des Projets',
                                icon: 'pi pi-bars',
                                routerLink: ['/projet/projets'],
                                roles: ['ADMIN', 'HR']
                            },
                          
                        ],
                        roles: ['ADMIN', 'HR']
                    },
                    {
                        label: 'Equipes',
                        icon: 'pi pi-users',
                        items: [
                            {
                                label: 'Ajouter Equipe',
                                icon: 'pi pi-user-plus',
                                routerLink: ['/projet/addteam'],
                                roles: ['ADMIN', 'HR']
                            },
                            {
                                label: 'List des équipes',
                                icon: 'pi pi-table',
                                routerLink: ['/projet/teams'],
                                roles: ['ADMIN', 'HR']
                            },
                          
                        ],
                        roles: ['ADMIN', 'HR']
                    },

                    { label: 'Ajouter des taches', 
                        icon: 'pi pi-pencil', 
                        routerLink: ['/projet/addtaches'],
                        roles: ['ADMIN', 'HR'] },

                        { label: 'Projets', 
                            icon: 'pi pi-briefcase', 
                            routerLink: ['/projet/userprojet'],
                            roles: ['EMPLOYEE'] },

                ],
                
            },
           
           
           
            {
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Offer Jobs',
                         icon: 'pi pi-fw pi-id-card',
                         routerLink: ['/pages/recruiting'],
                         roles: ['ADMIN', 'HR'] },
                    { label: 'Postuler', 
                        icon: 'pi pi-fw pi-id-card', 
                        routerLink: ['/pages/ApplicationForm'],
                        roles: ['ADMIN', 'HR'] },

                    {
                        label: 'Conge',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/conge'],
                        roles: ['ADMIN', 'HR']
                    },
                    {
                        label: 'CongeAdmin',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/conge-admin'],
                        roles: ['EMPLOYEE']
                    },
                    {
                        label: 'Departements',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/departement'],
                        roles: ['ADMIN', 'HR']
                    },
                ]
            },

            {
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    { label: 'Cours',
                         icon: 'pi pi-book',
                         routerLink: ['/cours'],
                         roles: ['ADMIN', 'HR','EMPLOYEE'] 
                        },

                    { label: 'Sections', 
                        icon: 'pi pi-bookmark', 
                        routerLink: ['/sections'],
                        roles: ['ADMIN', 'HR'] },

                    {
                        label: 'Contenus',
                        icon: 'pi pi-copy',
                        routerLink: ['/contenus'],
                        roles: ['ADMIN', 'HR','EMPLOYEE']
                    },
                    {
                        label: 'CongeAdmin',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/conge-admin'],
                        roles: ['EMPLOYEE']
                    },
                    {
                        label: 'Departements',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/departement'],
                        roles: ['ADMIN', 'HR']
                    },
                ]
            },
           
            
        ];
        this.filterMenuByRole();
    }


    filterMenuByRole() {
        // Iterate through the menu and filter out items the user is not authorized for based on their roles
        this.model = this.model.map(menuItem => {
          // Filter menu items for each menu category
          if (menuItem.items) {
            menuItem.items = menuItem.items.filter((item:any) => {
              // If no roles are specified for the item, show it by default
              if (!item.roles || item.roles.some((role:any) => this.userRoles.includes(role))) {
                return true;
              }
              return false;
            });
          }
          return menuItem;
        });
      }
}
