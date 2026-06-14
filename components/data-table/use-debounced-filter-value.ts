"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_DEBOUNCE_MS = 400;

type UseDebouncedFilterValueOptions = {
  debounceMs?: number;
};

export function useDebouncedFilterValue(
  value: string,
  onValueChange: (value: string) => void,
  options?: UseDebouncedFilterValueOptions,
) {
  const debounceMs = options?.debounceMs ?? DEFAULT_DEBOUNCE_MS;
  const [localValue, setLocalValue] = useState(value);
  const onValueChangeRef = useRef(onValueChange);

  onValueChangeRef.current = onValueChange;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      if (localValue !== value) {
        onValueChangeRef.current(localValue);
      }
    }, debounceMs);

    return () => window.clearTimeout(timeout);
  }, [localValue, value, debounceMs]);

  const clearValue = useCallback(() => {
    setLocalValue("");
  }, []);

  return { value: localValue, setValue: setLocalValue, clearValue };
}
