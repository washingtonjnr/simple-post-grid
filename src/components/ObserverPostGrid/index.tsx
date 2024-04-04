import { useEffect } from "react";

interface ObserverProps {
  threshold?: number;
  onIntersect: () => void;
}

const ObserverPostGrid: React.FC<ObserverProps> = ({
  threshold = 0.5,
  onIntersect,
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Checks if the target element is intersecting with the viewport
          if (entry.intersectionRatio >= threshold) {
            onIntersect();
          }
        });
      },
      { threshold }
    );

    // Observe the target element
    observer.observe(document.getElementById("observe-target-grid-posts") as HTMLElement);

    return () => {
      // Returns a cleanup function that disconnects the IntersectionObserver
      observer.disconnect();
    };
  }, [threshold, onIntersect]);

  // Returns target element that will be observed by IntersectionObserver
  return <div id="observe-target-grid-posts" />;
};

export default ObserverPostGrid;
