import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideApi } from '@mock-api';
import { provideLib } from '@solar-lib';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectFunctionsEmulator, getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideApi(),
    provideLib(),
    provideFirebaseApp(() => {
      return initializeApp({
        apiKey: 'AIzaSyD11v72UlOz0hcTEVqmueUIkQ4m7vwZcWk',
        authDomain: 'shidav-solar-dev.firebaseapp.com',
        projectId: 'shidav-solar-dev',
        storageBucket: 'shidav-solar-dev.firebasestorage.app',
        messagingSenderId: '848723212231',
        appId: '1:848723212231:web:20935cadd7b378d59ecbe2',
      });
    }),
    provideFunctions(() => {
      const functions = getFunctions(undefined, 'me-west1');
      connectFunctionsEmulator(functions, 'localhost', 5001);
      return functions;
    })
  ],
};
