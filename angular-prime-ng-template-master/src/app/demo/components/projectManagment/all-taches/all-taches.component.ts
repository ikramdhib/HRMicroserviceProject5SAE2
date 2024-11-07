import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { TachesService } from '../Services/taches.service';
interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-all-taches',
  templateUrl: './all-taches.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./all-taches.component.scss']
})
export class AllTachesComponent  {
  

  customers3: Customer[] = [];

  id: any | null = null;

  idFrozen: boolean = false;

  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(private confirmationService: ConfirmationService,private messageService: MessageService,private route: ActivatedRoute,private tachesService:TachesService, private customerService: CustomerService, private productService: ProductService) { }

  ngOnInit() {
      
      this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
      
      this.route.paramMap.subscribe(params => {
        this.id = params.get('id'); 
        console.log(this.id); 
      });

      this.getAllByProject(this.id)
      
  }
  confirm1(id:any) {
    this.confirmationService.confirm({
        key: 'confirm1',
        message: 'Are you sure to perform this action?',
        accept: () => {
           this.deletTache(id)
        },
    });
}
 

  getAllByProject(id:any){
    this.tachesService.getAllTachesByProjectId(id).subscribe({
      next:(res)=>{
        this.customers3=res;
      }
    })
  }

  deletTache(id:any){
    return this.tachesService.deleteTache(id).subscribe({
      next:(res)=>{
        this.messageService.add({ severity: 'success', summary: 'Confirmer', detail: 'le projet est suprimé avec succés' });
        
      },
      error:(error)=>{
        this.messageService.add({ severity: 'error', summary: 'Rejeter', detail: 'Il y a un erreur ' });

      }
    });
  }

}