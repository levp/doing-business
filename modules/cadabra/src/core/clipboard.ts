import { signal } from "./signal";

export interface CreateClipboardParams {
  timeout?: number;
}

export function createClipboard({
  timeout = 2000,
}: CreateClipboardParams = {}) {
  const copied = signal(false);
  const error = signal<Error | null>(null);
  const _copyTimeout = signal<number | null>(null);

  const handleCopyResult = (value: boolean) => {
    window.clearTimeout(_copyTimeout.value!);
    _copyTimeout.value = window.setTimeout(
      () => (copied.value = false),
      timeout
    );
    copied.value = value;
  };

  const copy = (valueToCopy: any) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(valueToCopy)
        .then(() => handleCopyResult(true))
        .catch((err) => (error.value = err));
    } else {
      error.value = new Error(
        "useClipboard: navigator.clipboard is not supported"
      );
    }
  };

  const reset = () => {
    copied.value = false;
    error.value = null;
    window.clearTimeout(_copyTimeout.value!);
  };

  // copyTimeout is only exposed to hook into any framework's lifecycle
  return { copy, reset, error, copied, _copyTimeout };
}
