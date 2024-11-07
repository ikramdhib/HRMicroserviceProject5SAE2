import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '../config/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styles: [`
    .user-dropdown-container {
        position: relative;
        display: inline-block;
        margin-left: 10px; /* Adjust spacing as desired */
    }
    
    .user-dropdown-menu {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: #fff;
        border: 1px solid #ddd;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        width: 150px;
        border-radius: 4px;
    }
    
    .dropdown-item {
        padding: 8px 12px;
        display: block;
        color: #333;
        text-decoration: none;
        cursor: pointer;
    }
    
    .dropdown-item:hover {
        background-color: #f0f0f0;
    }
    
    `]
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService , private authServ : AuthService,private router: Router) { }

    showUserMenu = false;

    logout() {
      this.authServ.logout();
      this.router.navigate(['/login']);
    }
}
