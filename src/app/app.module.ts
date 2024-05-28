import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent }   from './app.component';
import { RegistrationComponent } from './registration/registration';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ListComponent } from './list/list';
import { AppRoutingModule } from './app-routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {FormsModule} from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ToastModule } from "primeng/toast";
import {TooltipModule} from 'primeng/tooltip';
@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    PanelMenuModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    RadioButtonModule,
    RippleModule,
    FormsModule,
    CalendarModule,
    ReactiveFormsModule,
    TableModule,
    HttpClientModule,
    DropdownModule,
    CurrencyMaskModule,
    ConfirmPopupModule,
    ToastModule,
    TooltipModule
  ],
  declarations: [ AppComponent, RegistrationComponent, ListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ConfirmationService, MessageService]
})

export class AppModule { }
