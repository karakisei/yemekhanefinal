import { YemeksecDialogComponent } from './components/dialogs/yemeksec-dialog/yemeksec-dialog.component';
import { YemeklisteleComponent } from './components/yemeklistele/yemeklistele.component';
import { OgunDialogComponent } from './components/dialogs/ogun-dialog/ogun-dialog.component';
import { OgunlisteleComponent } from './components/ogunlistele/ogunlistele.component';
import { YemekDialogComponent } from './components/dialogs/yemek-dialog/yemek-dialog.component';
import { OgunComponent } from './components/ogun/ogun.component';
import { YemekComponent } from './components/yemek/yemek.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    YemekComponent,
    OgunComponent,
    OgunlisteleComponent,
    YemeklisteleComponent,
    //dialogs
    AlertDialogComponent,
    ConfirmDialogComponent,
    YemekDialogComponent,
    OgunDialogComponent,
    YemeksecDialogComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    OgunDialogComponent,
    YemekDialogComponent,
    YemeksecDialogComponent,

  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
