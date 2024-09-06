import { Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ReportUserComponent } from './report-user/report-user.component';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      {
        path: 'create',
        component: CreateUserComponent,
      },
      {
        path: 'update/:id',
        component: CreateUserComponent,
      },
      {
        path: 'list',
        component: ListUserComponent,
      },
      {
        path: 'report',
        component: ReportUserComponent,
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**', // Ruta comodín en caso de no encontrar coincidencias
    redirectTo: '',
  },
];
