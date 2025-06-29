import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AuthStore } from './stores/auth/auth.store';
import { authGuard } from './guards/auth.guard';

function getDefaultRoute() {
    const user = inject(AuthStore).user();
    if (user) {
        return 'user';
    } else {
        return 'login';
    }
}


export const routes: Routes = [
    {path: '', redirectTo: getDefaultRoute, pathMatch: 'full'},
    {path: 'login', loadComponent: () => import('./pages/login/login.component')}, 
    {path: 'user', loadComponent: () => import('./pages/user/user.component'), 
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadComponent: () => import('./pages/user/pages/dashboard/dashboard.component') },
            { path: 'invoice', loadComponent: () => import('./pages/user/pages/invoice/invoice.component') },
            { path: 'site', loadComponent: () => import('./pages/user/pages/site/site.component') },
        ]
    },
];
