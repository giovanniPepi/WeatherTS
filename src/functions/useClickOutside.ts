
import  React, {  SetStateAction, useEffect, useRef } from "react";

const useClickOutside = (handler: React.Dispatch<SetStateAction<Boolean>>) => {
  let domNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let maybeHandler = (event: MouseEvent) => {
      if (!domNode.current?.contains(event.target as HTMLElement)) {
        handler(false);
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

export default useClickOutside;