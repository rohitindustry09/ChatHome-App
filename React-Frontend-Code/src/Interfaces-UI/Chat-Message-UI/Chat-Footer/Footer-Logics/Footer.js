import { useEffect } from "react";

export function Footer({ input, navigationParent, navigationImage, navigationSend }) {
  useEffect(() => {
    // Check if all refs are defined
    if (!navigationImage?.current || !navigationSend?.current || !input?.current || !navigationParent?.current) {
      return;
    }

    const handleImage = () => {
      navigationImage.current.style.background = "";
      input.current.focus();
    };

    const handleSend = () => {
      navigationSend.current.style.background = "";
      input.current.focus();
    };

    const handleInputFocus = () => {
      setTimeout(() => {
        navigationParent.current.style.right = "20px";
        input.current.style.width = "60vw";
      }, 500);
    };

    const handleInputBlur = () => {
      if (input.current.value === "") {
        setTimeout(() => {
          navigationParent.current.style.right = "-120px";
          input.current.style.width = "100%";
        }, 500);
      } else {
        navigationParent.current.style.right = "20px";
      }
    };

    // Add event listeners
    navigationImage.current.addEventListener("click", handleImage);
    navigationSend.current.addEventListener("click", handleSend);
    input.current.addEventListener("focus", handleInputFocus);
    input.current.addEventListener("blur", handleInputBlur);

    // Cleanup function with null checks
    return () => {
      if (navigationImage?.current) {
        navigationImage.current.removeEventListener("click", handleImage);
      }
      if (navigationSend?.current) {
        navigationSend.current.removeEventListener("click", handleSend);
      }
      if (input?.current) {
        input.current.removeEventListener("focus", handleInputFocus);
        input.current.removeEventListener("blur", handleInputBlur);
      }
    };
  }, [input, navigationParent, navigationImage, navigationSend]);

  return null;
}
