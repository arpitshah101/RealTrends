import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {DropdownModule} from 'primeng/dropdown';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        DropdownModule,
        FormsModule,
        HttpModule,
        HttpClientModule
    ],
    providers: [
        HttpModule,
        HttpClientModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
