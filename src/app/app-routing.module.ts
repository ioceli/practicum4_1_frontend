import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login/login.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
  children: [
    { path: 'tasas', children: [
      ]
    },
    { path: 'direcionhabilitacion', children: [
      ]
    },
    { path: 'medicinaprepagada', children: [
      ]
    },

    ]},
  { path: 'externo', component: HomeComponent,
    children: [
      // { path: 'formulario', component: FormularioComponent},
      // { path: 'seccion', component: SeccionComponent},
      ]},
  { path: '404', component: ErrorpageComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
