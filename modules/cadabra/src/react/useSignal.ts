import { useEffect, useState } from "react";
import { SignalView } from "../core";

export function useSignal<T>(sig: SignalView<T>) {
  const [value, setValue] = useState<T>(sig.value);

  useEffect(() => {
    return sig.subscribe(setValue);
  }, []);

  // not sure if it is good to directoly operate on the signal value,
  // might want to expose setValue to align with react's mental mode
  return value;
}
