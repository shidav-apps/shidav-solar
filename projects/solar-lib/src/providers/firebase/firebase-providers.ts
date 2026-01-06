import { EnvironmentProviders } from '@angular/core';
import {
  FirebaseOptions,
  initializeApp,
  provideFirebaseApp,
} from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  connectFunctionsEmulator,
  getFunctions,
  provideFunctions,
} from '@angular/fire/functions';
import {
  getFirestore,
  provideFirestore,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import { connectStorageEmulator, getStorage, provideStorage } from '@angular/fire/storage';

export function firebaseProvider(config: FirebaseOptions): EnvironmentProviders {
  return provideFirebaseApp(() => initializeApp(config));
}

export function authProvider(useEmulator: boolean = false): EnvironmentProviders {
  return provideAuth(() => {
    const auth = getAuth();
    if (useEmulator) {
      connectAuthEmulator(auth, 'http://localhost:9099');
    }
    return auth;
  });
}

export function functionsProvider(
  region: string,
  useEmulator: boolean = false
): EnvironmentProviders {
  return provideFunctions(() => {
    const functions = getFunctions(undefined, region);
    if (useEmulator) {
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
  });
}

export function firestoreProvider(useEmulator: boolean = false): EnvironmentProviders {
  return provideFirestore(() => {
    const firestore = getFirestore();
    if (useEmulator) {
      connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
    return firestore;
  });
}

export function storageProvider(useEmulator: boolean = false): EnvironmentProviders {
  return provideStorage(() => {
    const storage = getStorage();
    if (useEmulator) {
      connectStorageEmulator(storage, 'localhost', 9199);
    }
    return storage;
  });
}
