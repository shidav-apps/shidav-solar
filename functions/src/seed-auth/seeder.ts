import { getAuth, Auth } from 'firebase-admin/auth';
import { cert, initializeApp } from 'firebase-admin/app';
import { delay } from './utils';
import { USERS } from './users';
import { v4 as uuidv4 } from 'uuid';

let auth: Auth;

export async function initForEmulators() {
  const projectId = 'shidav-solar-dev';
  process.env['FIRESTORE_EMULATOR_HOST'] = '127.0.0.1:8080';
  process.env['FIREBASE_AUTH_EMULATOR_HOST'] = '127.0.0.1:9099';
  process.env['GCLOUD_PROJECT'] = projectId;

  const admin = initializeApp({
    projectId,
  });

  auth = getAuth(admin);

  await seedUsers(true);
}

export async function initForCI() {
  const serviceAccount = JSON.parse(process.env.KEY_SERVICE_ACCOUNT!);

  const app = initializeApp({
    credential: cert(serviceAccount),
  });
  auth = getAuth(app);
  await seedUsers(false);
}

async function seedUsers(isDev: boolean) {
  if (isDev) {
    let emulatorsUp = false;
    while (emulatorsUp === false) {
      try {
        await fetch('http://127.0.0.1:9099');
        emulatorsUp = true;
        USERS.forEach(async (u) => {
          // check if user already exists
          const userRecord = await auth.getUserByEmail(u.email).catch(() => null);
          if (userRecord) {
            return;
          }
          await auth.createUser({
            uid: uuidv4(),
            email: u.email,
            displayName: u.displayName,
            password: u.password,
          });
        });
      } catch {
        console.log('retrying seeding');
        await delay(5000);
      }
    }
  } else {
    USERS.forEach(async (u) => {
      // check if user already exists
      const userRecord = await auth.getUserByEmail(u.email).catch(() => null);
      if (userRecord) {
        return;
      }

      await auth.createUser({        
        uid: uuidv4(),
        email: u.email,
        displayName: u.displayName,
        password: u.password,
      });
    });
  }
}
