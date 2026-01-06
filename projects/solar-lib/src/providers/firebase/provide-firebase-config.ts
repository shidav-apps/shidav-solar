import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { FirebaseOptions } from '@angular/fire/app';
import { FirebaseFeature } from './firebase-features';
import { authProvider, firebaseProvider, firestoreProvider, functionsProvider, storageProvider } from './firebase-providers';

export function provideFirebaseConfig(
  config: FirebaseOptions,
  region: string,
  ...features: FirebaseFeature[]
): EnvironmentProviders {
    const providers: EnvironmentProviders[] = [
        firebaseProvider(config),
    ];

    for (const feature of features) {
        switch (feature.type) {
            case 'auth':
                providers.push(authProvider(feature.useEmulator ?? false));
                break;
            case 'functions':
                providers.push(functionsProvider(region, feature.useEmulator ?? false));
                break;
            case 'firestore':
                providers.push(firestoreProvider(feature.useEmulator ?? false));
                break;
            case 'storage':
                providers.push(storageProvider(feature.useEmulator ?? false));
                break;
        }
    }

    return makeEnvironmentProviders(providers);
}

