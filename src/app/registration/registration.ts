import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.types';

/*
  - Arquivo de formulário de cadastro de Produtos;
  - Possui validações e formatações específicas de certos campos;
*/
@Component({
  selector: 'registration',
  templateUrl: './registration.html'
})
export class RegistrationComponent {

  constructor(private primengConfig: PrimeNGConfig, private _formBuilder: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private messageService: MessageService,) { }
  productForm!: UntypedFormGroup;
  unities: string[] = [
    'Litro',
    'Quilograma',
    'Unidade'
  ];

  isPerishableProductValue: boolean | undefined = false;

  isEditingProduct: boolean = false;

  selectedProduct: (Product) | null = null;

  isFabricationDateAfter: boolean = false;

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.selectedProduct = JSON.parse(params['data']);
        this.isPerishableProductValue = this.selectedProduct?.isPerishableProduct;
        if (this.selectedProduct?.expirationDate && this.selectedProduct?.fabricationDate) {
          this.selectedProduct.expirationDate = new Date(this.selectedProduct.expirationDate);
          this.selectedProduct.fabricationDate = new Date(this.selectedProduct.fabricationDate);
        }

      }
    });

    this.getDefaultForm();
  }

  /*
  Formulário do Produto a ser adicionado ou editado
  */
  getDefaultForm(product?: Product): void {
    this.productForm?.reset();
    this.productForm = this._formBuilder.group({
      id: [this.selectedProduct?.id ?? ''],
      name: [this.selectedProduct?.name ?? '', [Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-ZÀ-ÿ ]*$')]],
      unity: [this.selectedProduct?.unity ?? '', [Validators.required]],
      quantity: [this.selectedProduct?.quantity ?? ''],
      price: [this.selectedProduct?.price ?? '', [Validators.required]],
      isPerishableProduct: [this.selectedProduct?.isPerishableProduct ? true : false, [Validators.required]],
      expirationDate: [this.selectedProduct?.expirationDate ?? ''],
      fabricationDate: [this.selectedProduct?.fabricationDate ?? '', [Validators.required]],
    }, { validators: [this.forbiddenFabricationDateValidator] });
    if (product) this.productForm.patchValue(product);

    this.productForm.get('unity')?.valueChanges.subscribe(unity => {
      this.checkUnityField(unity);
    });
  }

  /*
Validaões para o campo "unidade"
*/
  checkUnityField(unity: string): void {
    const quantityControl = this.productForm.get('quantity');

    if (unity === 'Litro' || unity === 'Quilograma') {
      quantityControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d+(\.\d{1,3})?$/) // Permitir até 3 casas decimais
      ]);
    } else if (unity === 'Unidade') {
      quantityControl?.setValidators([
        Validators.required,
        Validators.pattern(/^\d+$/) // Permitir apenas números inteiros
      ]);
    } else {
      quantityControl?.clearValidators();
    }
    quantityControl?.updateValueAndValidity();
  }

  /*
Retorna o Addon correto para cada tipo de unidade do produto
*/
  chooseAddon(): string {
    const unityControl = this.productForm.get('unity');
    const value = unityControl?.value;

    switch (value) {
      case "Litro":
        return 'lt';
      case "Quilograma":
        return 'kg';
      default:
        return 'un';
    }
  }

  /*
Validação para ver se o campo de data de fabricação é superior ao de data de validade
*/
  forbiddenFabricationDateValidator = (formGroup: FormGroup): boolean | null => {
    const expirationDate = formGroup.get('expirationDate')?.value;
    const fabricationDate = formGroup.get('fabricationDate')?.value;

    if (this.productForm?.get('isPerishableProduct')?.value && expirationDate && fabricationDate && fabricationDate > expirationDate) {
      this.isFabricationDateAfter = true;
      return true;
    }
    this.isFabricationDateAfter = false;
    return null;

  }
  /*
Escuta o checkbox de verificar se o produto é perecível ou não e seta a variável
*/
  onChangeCheckbox(event: any): void {
    this.isPerishableProductValue = event;
  }
  /*
Função para adicionar ou editar um produto, além de alterar o localStorage
*/
  onSubmit() {
    let product: Product = this.productForm.value;
    let randomId = Math.floor(Math.random() * 100000);
    let paddedId = randomId.toString().padStart(5, '0');
    product.id = Number(paddedId);
    let storedProducts = localStorage.getItem('products');
    let products = storedProducts ? JSON.parse(storedProducts) : [];
    if (this.selectedProduct) {
      let index = products.findIndex((product: { id: number; }) => product.id === this.selectedProduct?.id);
      if (index != -1) {
        products[index] = product;
        localStorage.setItem('products', JSON.stringify(products));
      } else {
        console.warn(`Product with id ${this.selectedProduct.id} not found.`);
      }
      this.messageService.add({
        severity: "success",
        summary: "Confirmado",
        detail: "Produto editado com sucesso."
      });
    }
    else {
      products.push(product);
      this.messageService.add({
        severity: "success",
        summary: "Confirmado",
        detail: "Produto adicionado com sucesso."
      });
    }
    localStorage.setItem('products', JSON.stringify(products));
    this.productForm.reset();

    this.selectedProduct = null;
    if (this.productForm.valid) {
      this.productForm.reset();
    }

  }
  /*
Navega para a página de listagem de itens
*/
  goToList() {
    this.router.navigate(['/list']);
  }
}
