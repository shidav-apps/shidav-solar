import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';
import { asyncObservable } from '../rxjs';
import { DbModel } from '@db-model';

type UserMapper = (user: User) => Promise<DbModel.User>;

function relogin(auth: Auth, userMapper: UserMapper): Observable<DbModel.LoginResult> {
  return asyncObservable<DbModel.LoginResult>(async (subscriber) => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const mockUser = await userMapper(user);

        subscriber.next({
          type: 'success',
          user: mockUser,
        });
      } else {
        subscriber.next({ type: 'not-init' });
      }
      unsub();
      subscriber.complete();
    });
  });
}

function loginWithCredentials(
  auth: Auth,
  userid: string,
  password: string,
  userMapper: UserMapper
): Observable<DbModel.LoginResult> {
  return asyncObservable<DbModel.LoginResult>(async (subscriber) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userid,
        password
      );
      const mockUser = await userMapper(userCredential.user);
      subscriber.next({
        type: 'success',
        user: mockUser,
      });
    } catch (error) {
      let reason: DbModel.LoginError['reason'] = 'User Id Not Found';
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/wrong-password'
      ) {
        reason = 'Incorrect Password';
      }

      const res: DbModel.LoginResult = {
        type: 'error',
        reason: reason,
      };
      subscriber.next(res);
    } finally {
      subscriber.complete();
    }
  });
}

function logout(auth: Auth): Observable<void> {
  return from(signOut(auth)).pipe(map(() => void 0));
}

export const fbAuth = {
  relogin,
  loginWithCredentials,
  logout,
};
