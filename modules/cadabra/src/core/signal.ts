export type SignalView<T> = {
  get value(): T;
  subscribe(listener: SignalListener<T>): DisposeListener;
};

export type Signal<T> = {
  set value(value: T);
  get value(): T;
  subscribe(listener: SignalListener<T>): DisposeListener;
};

export type SignalListener<T> = (value: T) => void;

export type DisposeListener = () => void;

type ExtractGenericType<T> = T extends Signal<infer U> ? U : never;

type TupleToGenericParams<T extends any[]> = {
  [K in keyof T]: T[K] extends Signal<any> ? ExtractGenericType<T[K]> : never;
};

export function computed<T, TDependencies extends Signal<any>[]>(
  dependencies: TDependencies,
  compute: (...deps: TupleToGenericParams<TDependencies>) => T
): SignalView<T> {
  const listeners = new Set<SignalListener<T>>();
  let value: T;
  const listener = () => {
    const newValue = compute(...(dependencies.map((s) => s.value) as any));
    if (newValue === value) {
      return;
    }
    value = newValue;
    for (const listener of listeners) {
      listener(value);
    }
  };
  listener();
  for (const dependency of dependencies) {
    dependency.subscribe(listener);
  }
  return {
    get value() {
      return value;
    },
    subscribe(listener: SignalListener<T>): DisposeListener {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}

export function signal<T>(initialValue: T): Signal<T> {
  let value = initialValue;
  const listeners = new Set<SignalListener<T>>();

  return {
    get value() {
      return value;
    },
    set value(newValue: T) {
      if (newValue === value) {
        // Avoid notifying listeners if the value hasn't changed.
        return;
      }
      value = newValue;
      // Notify all listeners of the new value.
      for (const listener of listeners) {
        listener(value);
      }
    },
    subscribe(listener: SignalListener<T>): DisposeListener {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
