import { shallowRef, onMounted, onUnmounted } from "vue";
import { SignalView } from "../core";

export function useSignal<T>(sig: SignalView<T>) {
  const value = shallowRef<T>(sig.value);
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    unsubscribe = sig.subscribe((newValue: T) => {
      value.value = newValue;
    });
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  // not sure if it is good to directly operate on the signal value,
  // might want to expose setValue to align with Vue's mental model
  return value;
}
