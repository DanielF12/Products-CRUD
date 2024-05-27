import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'registration',
  templateUrl: './registration.html'
})
export class RegistrationComponent {

  constructor(private primengConfig: PrimeNGConfig, private _formBuilder: FormBuilder, private router: Router) { }
  items: MenuItem[] = [];
  date1: Date | undefined;
  itemForm!: FormGroup;
  unities: string[] = [
    'Litro',
    'Quilograma',
    'Unidade'
  ];

  isPerishableProductValue: boolean | null = false;

  isPerishableProductValueDic = {
    'true': 'Sim',
    'false': 'Não'
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.getDefaultForm();
  }

  getDefaultForm(item?: any): void {
    this.itemForm?.reset();
    this.itemForm = this._formBuilder.group({

      name: [ '', [Validators.required, Validators.maxLength(50)]],
      unity: ['', [Validators.required, Validators.pattern(/^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/)]],
      quantity: [''],
      price: ['', [Validators.required]],
      isPerishableProduct: [this.isPerishableProductValue, [Validators.required]],
      expirationDate: ['', [Validators.required]],
      fabricationDate: ['', [Validators.required]],
    }, { validator: [this.forbiddenCnpjlValidator(), this.forbiddenCnpjFormatlValidator()] });
    if (item) this.itemForm.patchValue(item);
  }

  onChangeCheckbox(event: any): void {
    this.isPerishableProductValue = event;
  }

  onSubmit() {
    console.log("SUBMIT: ", this.itemForm.value);
    localStorage.setItem('itemFormData', JSON.stringify(this.itemForm.value));

    const navigationExtras: NavigationExtras = {
      queryParams: { data: JSON.stringify(this.itemForm.value) }
    };
    this.router.navigate(['/list'], navigationExtras);

    this.itemForm.reset();



    if (this.itemForm.valid) {
      console.log('Form data:', this.itemForm.value);
      alert('Formulário enviado com sucesso!');
      this.itemForm.reset();
    }
  }

  /**
    * Validator para CNPJ
    * @returns ValidatorFn
    */
  forbiddenCnpjlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // const cnpj = control.get('cnpj').value;
      // const forbidden: boolean = this.allCompanies$.value?.all.some(x => x.cnpj == cnpj) && cnpj != this.selectedCompany.cnpj;
      // forbidden ? control.get('cnpj').setErrors({ forbiddenCnpj: { value: cnpj } }) : null;
      const forbidden = null;
      return forbidden ? { forbiddenCnpj: { value: 'abc' } } : null;
    }
  }

  forbiddenCnpjFormatlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      //     const cnpj = control.get('cnpj').value;
      //     const pattern = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})$/;
      //     const forbidden: boolean = !pattern.test(cnpj);
      //     forbidden ? control.get('cnpj').setErrors({ forbiddenFormatCnpj: { value: cnpj } }) : null;
      //     return forbidden ? { forbiddenFormatCnpj: { value: cnpj } } : null;
      const forbidden = null;
      return forbidden ? { forbiddenCnpj: { value: 'abc' } } : null;
    }

  }

}
