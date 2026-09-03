import { useEffect, useRef, RefObject } from "react";

/**
 * Redirige tout scroll (molette + swipe tactile) qui arrive n'importe où sur la
 * fenêtre vers l'élément retourné, même si le pointeur n'est pas dessus.
 */
export function useWindowScrollProxy<T extends HTMLElement>(): RefObject<T | null> {
  const targetRef = useRef<T | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleWheel = (e: WheelEvent) => {
      target.scrollTop += e.deltaY;
      e.preventDefault();
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const currentY = e.touches[0].clientY;
      target.scrollTop += touchStartY - currentY;
      touchStartY = currentY;
      e.preventDefault();
    };

    // passive: false est indispensable pour pouvoir appeler preventDefault()
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return targetRef;
}

export default useWindowScrollProxy;
