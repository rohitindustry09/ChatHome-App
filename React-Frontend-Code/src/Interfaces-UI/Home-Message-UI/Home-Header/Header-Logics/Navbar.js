import React, { useState, useEffect } from "react";

export function Navbar({ navbarRef }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollPosition(currentScroll);

      const moveDistance = Math.min(currentScroll, 500);

      if (navbarRef && navbarRef.current) {
        if (moveDistance < 10) {
          navbarRef.current.style.padding = `${moveDistance}px`;
          navbarRef.current.style.letterSpacing = `${moveDistance+3}px`;
          navbarRef.current.style.borderBottomLeftRadius = `${moveDistance}px`;
          navbarRef.current.style.borderBottomRightRadius = `${moveDistance}px`;
        } else {
          navbarRef.current.style.padding = "10px";
          navbarRef.current.style.letterSpacing = '10px';
          navbarRef.current.style.borderBottomLeftRadius = "20px";
          navbarRef.current.style.borderBottomRightRadius = "20px";
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navbarRef]);
  return null;
}


//uses by
  //HeaderTop.jsx