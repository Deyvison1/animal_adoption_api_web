import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'animal-type',
    loadComponent: () =>
      import('./features/control-admin/animal-type/animal-type.component').then(
        (r) => r.AnimalTypeComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'form',
        loadComponent: () =>
          import(
            './features/control-admin/animal-type/animal-type-form/animal-type-form.component'
          ).then((r) => r.AnimalTypeFormComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'form/:id',
        loadComponent: () =>
          import(
            './features/control-admin/animal-type/animal-type-form/animal-type-form.component'
          ).then((r) => r.AnimalTypeFormComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'list',
        loadComponent: () =>
          import(
            './features/control-admin/animal-type/animal-type-list/animal-type-list.component'
          ).then((r) => r.AnimalTypeListComponent),
        canActivate: [AuthGuard],
      },
    ],
  },

  {
    path: 'breed',
    loadComponent: () =>
      import('./features/control-admin/breed/breed.component').then(
        (r) => r.BreedComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'form',
        loadComponent: () =>
          import(
            './features/control-admin/breed/breed-form/breed-form.component'
          ).then((r) => r.BreedFormComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'form/:id',
        loadComponent: () =>
          import(
            './features/control-admin/breed/breed-form/breed-form.component'
          ).then((r) => r.BreedFormComponent),
        canActivate: [AuthGuard],
      },
      {
        path: 'list',
        loadComponent: () =>
          import(
            './features/control-admin/breed/breed-list/breed-list.component'
          ).then((r) => r.BreedListComponent),
        canActivate: [AuthGuard],
      },
    ],
  },
];
