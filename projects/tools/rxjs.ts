import { Observable, Observer, Subscriber } from "rxjs";

type AsyncOnSubscribe<T> = (observer: Subscriber<T>) => Promise<void>;

export function asyncObservable<T>(onSubscribe: AsyncOnSubscribe<T>) {
    return new Observable<T>((observer) => {
        onSubscribe(observer);
        return () => { /* no-op */ }
    });
}