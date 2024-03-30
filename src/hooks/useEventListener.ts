import { useEffect, useRef } from "react";

export const useEventListener = (
  eventType: string,
  callback: (e: Event) => void,
  element: Element | Window = window
) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  useEffect(() => {
    const handler = (e: Event) => callbackRef.current(e);

    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, element]);
};
