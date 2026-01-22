import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutPublicComponent } from './layout/layout-public/layout-public.component';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutPublicComponent,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/public/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
      {
        path: 'dog',
        loadComponent: () =>
          import('./features/public/dog-list/dog-list.component').then(
            (m) => m.DogListComponent
          ),
      },
      {
        path: 'cat',
        loadComponent: () =>
          import('./features/public/cat-list/cat-list.component').then(
            (m) => m.CatListComponent
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'forbidden',
        loadComponent: () =>
          import('./shared/components/forbidden/forbidden.component').then(
            (r) => r.ForbiddenComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'dog',
        loadComponent: () =>
          import('./features/control-admin/dog/dog.component').then(
            (r) => r.DogComponent
          ),
        canActivate: [AuthGuard],
        children: [
          {
            path: 'form',
            loadComponent: () =>
              import(
                './features/control-admin/dog/dog-form/dog-form.component'
              ).then((r) => r.DogFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN'] },
          },
          {
            path: 'form/:id',
            loadComponent: () =>
              import(
                './features/control-admin/dog/dog-form/dog-form.component'
              ).then((r) => r.DogFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN'] },
          },
          {
            path: 'form/:id/view',
            loadComponent: () =>
              import(
                './features/control-admin/dog/dog-form/dog-form.component'
              ).then((r) => r.DogFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN', 'ADMIN_READ'] },
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './features/control-admin/dog/dog-list/dog-list.component'
              ).then((r) => r.DogListComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN', 'ADMIN_READ'] },
          },
        ],
      },

      {
        path: 'cat',
        loadComponent: () =>
          import('./features/control-admin/cat/cat.component').then(
            (r) => r.CatComponent
          ),
        canActivate: [AuthGuard],
        children: [
          {
            path: 'form',
            loadComponent: () =>
              import(
                './features/control-admin/cat/cat-form/cat-form.component'
              ).then((r) => r.CatFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN'] },
          },
          {
            path: 'form/:id',
            loadComponent: () =>
              import(
                './features/control-admin/cat/cat-form/cat-form.component'
              ).then((r) => r.CatFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN'] },
          },
          {
            path: 'form/:id/view',
            loadComponent: () =>
              import(
                './features/control-admin/cat/cat-form/cat-form.component'
              ).then((r) => r.CatFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN', 'ADMIN_READ'] },
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './features/control-admin/cat/cat-list/cat-list.component'
              ).then((r) => r.CatListComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN', 'ADMIN_READ'] },
          },
        ],
      },

      {
        path: 'animal-type',
        loadComponent: () =>
          import(
            './features/control-admin/animal-type/animal-type.component'
          ).then((r) => r.AnimalTypeComponent),
        canActivate: [AuthGuard],
        children: [
          {
            path: 'form',
            loadComponent: () =>
              import(
                './features/control-admin/animal-type/animal-type-form/animal-type-form.component'
              ).then((r) => r.AnimalTypeFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN'] },
          },
          {
            path: 'form/:id',
            loadComponent: () =>
              import(
                './features/control-admin/animal-type/animal-type-form/animal-type-form.component'
              ).then((r) => r.AnimalTypeFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN'] },
          },
          {
            path: 'form/:id/view',
            loadComponent: () =>
              import(
                './features/control-admin/animal-type/animal-type-form/animal-type-form.component'
              ).then((r) => r.AnimalTypeFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN', 'ADMIN_READ'] },
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './features/control-admin/animal-type/animal-type-list/animal-type-list.component'
              ).then((r) => r.AnimalTypeListComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN', 'ADMIN_READ'] },
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
            data: { roles: ['ADMIN'] },
          },
          {
            path: 'form/:id',
            loadComponent: () =>
              import(
                './features/control-admin/breed/breed-form/breed-form.component'
              ).then((r) => r.BreedFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN'] },
          },
          {
            path: 'form/:id/view',
            loadComponent: () =>
              import(
                './features/control-admin/breed/breed-form/breed-form.component'
              ).then((r) => r.BreedFormComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN', 'ADMIN_READ'] },
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './features/control-admin/breed/breed-list/breed-list.component'
              ).then((r) => r.BreedListComponent),
            canActivate: [AuthGuard],
            data: { roles: ['ADMIN', 'ADMIN_READ'] },
          },
        ],
      },
    ],
  },
];
