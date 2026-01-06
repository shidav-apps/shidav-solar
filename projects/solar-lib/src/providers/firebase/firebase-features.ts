export interface FirebaseAuthFeature {
    type: 'auth';
    useEmulator?: boolean;
}

export function withFirebaseAuth(useEmulator: boolean = false): FirebaseAuthFeature {
    return {
        type: 'auth',
        useEmulator,
    };
}

export interface FirebaseFunctionsFeature {
    type: 'functions';
    useEmulator?: boolean;
}

export function withFirebaseFunctions(useEmulator: boolean = false): FirebaseFunctionsFeature {
    return {
        type: 'functions',
        useEmulator,
    };
}

export interface FirebaseFirestoreFeature {
    type: 'firestore';
    useEmulator?: boolean;
}

export function withFirebaseFirestore(useEmulator: boolean = false): FirebaseFirestoreFeature {
    return {
        type: 'firestore',
        useEmulator,
    };
}

export interface FirebaseStorageFeature {
    type: 'storage';
    useEmulator?: boolean;
}
export function withFirebaseStorage(useEmulator: boolean = false): FirebaseStorageFeature {
    return {
        type: 'storage',
        useEmulator,
    };
}

export type FirebaseFeature =
    | FirebaseAuthFeature
    | FirebaseFunctionsFeature
    | FirebaseFirestoreFeature
    | FirebaseStorageFeature;