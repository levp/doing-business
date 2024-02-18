import { createClipboard } from "../core";
import { useSignal } from "./useSignal";

export function useClipboard() {
  const clipboard = createClipboard();

  // copyTimeout state value itself is not needed, but should rerender on mutation
  useSignal(clipboard._copyTimeout);
  const copied = useSignal(clipboard.copied);
  const error = useSignal(clipboard.error);

  return {
    copied,
    error,

    copy: clipboard.copy,
    reset: clipboard.reset,
  };
}
