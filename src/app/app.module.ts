import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
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
// import {DropdownModule} from 'primeng/dropdown';

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
    HttpClientModule
    // DropdownModule
  ],
  declarations: [ AppComponent, RegistrationComponent, ListComponent ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
