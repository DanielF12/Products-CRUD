import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            {
            label: 'Cadastro',
            icon:'pi pi-fw pi-file',
            routerLink: '/registration'

            },
            {
            label: 'Listagem',
            icon:'pi pi-fw pi-pencil',
            routerLink: '/list'
            },

        ]
    }
}
