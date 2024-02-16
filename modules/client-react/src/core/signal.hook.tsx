import {useEffect, useState} from 'react';
import {SignalView} from '@doing-business/core/dist/signal';

export function useSignal<T>(sig: SignalView<T>) {
  const [value, setValue] = useState<T>(sig.value);

  useEffect(() => {
    return sig.subscribe(setValue);
  });

  return value;
}
