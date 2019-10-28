import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment} from '../environments/environment';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabase} from "angularfire2/database";
import { EntryFormComponent } from './entry-form/entry-form.component';
import { ExitFormComponent } from './exit-form/exit-form.component';
import { Screen0Component } from './entry-form/screen0/screen0.component';
import { Screen1Component } from './entry-form/screen1/screen1.component';
import { Screen2Component } from './exit-form/screen2/screen2.component';
import { Screen3Component } from './entry-form/screen3/screen3.component';
import { Screen4Component } from './exit-form/screen4/screen4.component';

//incluyendo formulario
import { ReactiveFormsModule } from '@angular/forms';

//incluyendo routher
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {path:'resultado', component:ExitFormComponent},
  {path:'formulario', component:EntryFormComponent},
  {path:'pantalla_0', component:Screen0Component},
  {path:'pantalla_1', component:Screen1Component},
  {path:'pantalla_2', component:Screen2Component},
  {path:'pantalla_3', component:Screen3Component},
  {path:'pantalla_4', component:Screen4Component},
  {path:'', component:Screen0Component},
  { path: '',   redirectTo: '/pantalla_0', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    EntryFormComponent,
    ExitFormComponent,
    Screen0Component,
    Screen1Component,
    Screen2Component,
    Screen3Component,
    Screen4Component
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [ AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
