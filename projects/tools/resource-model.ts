export type ResourceModel<T> =
  | ResourceIdle
  | ResourceResolved<T>
  | ResourceBusy
  | ResourceError;

export function initialResourceModel<T>() : ResourceModel<T> {
  return {
    status: 'idle',
    value: null,
    error: null
  }
}

export function resolvedResourceModel<T>(value: T) : ResourceModel<T> {
  return {
    status: 'resolved',
    value,
    error: null
  }
}

export function busyResourceModel<T>() : ResourceModel<T> {
  return {
    status: 'busy',
    value: null,
    error: null
  }
}

export function errorResourceModel<T>(error: string) : ResourceModel<T> {
  return {
    status: 'error',
    value: null,
    error
  }
}

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
