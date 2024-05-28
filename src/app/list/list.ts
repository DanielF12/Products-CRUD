import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
} from "primeng/api";
import { Product } from '../product.types';

/*
  - Arquivo de listagem de Produtos;
  - É possível visualizar todos os produtos, além de deletar e editar algum específico;
*/

@Component({
  selector: 'list',
  templateUrl: './list.html'
})
export class ListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    try {
      const storedProduct = localStorage.getItem('products');
      if (storedProduct) {
        // products o array de produtos do localStorage
        this.products = JSON.parse(storedProduct);
        console.log("PRODUCTS:", this.products);
      } else {
        this.products = [];
      }
    } catch (error) {
      console.error("Erro no localStorage:", error);
      this.products = [];
    }
  }
  /*
Envia o objeto do produto selecionado da tabela para a página de cadastro de itens e navega para a página em questão
*/
  editProduct(product: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: { data: JSON.stringify(product) }
    };
    this.router.navigate(['/registration'], navigationExtras);
  }

  /*
Formata a data para o formato dd/mm/yyyy
*/
  formatDate(date: string | Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  /*
Formata o número para currency BRL
*/
  formatCurrency(price: number) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  }
  /*
Deleta o produto selecionado da tabela e do localStorage
*/
  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: "Tem certeza que deseja excluir o produto selecionado?",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Remover",
      rejectLabel: "Cancelar",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmado",
          detail: "Produto removido"
        });
        let idToRemove = this.products.indexOf(product);
        if (idToRemove !== -1) {
          this.products.splice(idToRemove, 1);
          localStorage.setItem('products', JSON.stringify(this.products));
        }
      },
    });
  }
  /*
Navega para a página de cadastro de itens
*/
  addProduct() {
    this.router.navigate(['/registration']);
  }

}
