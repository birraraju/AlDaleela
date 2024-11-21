import { useEffect, useRef } from "react";

// usePrevious.js
export default function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  