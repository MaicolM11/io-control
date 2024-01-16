import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengLibModule } from './module/primeng-lib.module';
import { HomeComponent } from './pages/home/home.component';
import { FormpageComponent } from './pages/formpage/formpage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengLibModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
