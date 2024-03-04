import { useEffect } from "react";

export function useRecipifyWindowTitle(prefix?: string | null) {
  useEffect(() => {
    const currentTitle = window.document.title;

    if (!prefix) {
      window.document.title = "Recipify";
    } else {
      window.document.title = `${prefix} - Recipify`;
    }
    return () => {
      window.document.title = currentTitle;
    };
  }, [prefix]);
}
