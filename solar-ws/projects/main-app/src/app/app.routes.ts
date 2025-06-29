import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'login', loadComponent: () => import('./pages/login/login.component')}, 
    {path: 'user', loadComponent: () => import('./pages/user/user.component'), 
        children: [
            { path: 'dashboard', loadComponent: () => import('./pages/user/pages/dashboard/dashboard.component') },
            { path: 'invoice', loadComponent: () => import('./pages/user/pages/invoice/invoice.component') },
            { path: 'site', loadComponent: () => import('./pages/user/pages/site/site.component') },
        ]
    },
];
