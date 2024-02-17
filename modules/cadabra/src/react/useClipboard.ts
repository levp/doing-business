import { useMemo } from "react";

import { CreateClipboardParams, createClipboard } from "../core";
import { useSignal } from "./useSignal";

export function useClipboard(options: CreateClipboardParams = {}) {
  // let's keep this scoped
  const clipboard = useMemo(() => createClipboard(options), []);

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
