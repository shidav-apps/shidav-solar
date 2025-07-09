export type ResourceModel<T> =
  | ResourceIdle
  | ResourceResolved<T>
  | ResourceBusy
  | ResourceError;

type ResourceIdle = {
    status: 'idle', 
    value: null, 
    error: null
};

type ResourceResolved<T> = {
  status: 'resolved';
  value: T;
  error: null;
};

type ResourceBusy = {
  status: 'busy';
  value: null;
  error: null;
};

type ResourceError = {
  status: 'error';
  value: null;
  error: string;
};
