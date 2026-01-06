export interface AuthUser {
    readonly email: string;
    readonly password: string;
    readonly displayName: string;
}

export const USERS: AuthUser[] = [
    { email: 'kobihari@gmail.com', password: 'Correct', displayName: 'Kobi Hari' },
    { email: 'nirpeleg@gmail.com', password: 'Correct', displayName: 'Nir Peleg' },
    { email: 'dana.mir@example.com', password: 'Correct', displayName: 'Dana Mir' },
    { email: 'ron.levi@example.com', password: 'Correct', displayName: 'Ron Levi' },
    { email: 'lior.shapira@example.com', password: 'Correct', displayName: 'Lior Shapira' },
];