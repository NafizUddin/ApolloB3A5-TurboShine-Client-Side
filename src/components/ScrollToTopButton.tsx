import { useState, useEffect } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleScroll = () => {
    const scrollTotal =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;
    setScrollProgress((scrollPosition / scrollTotal) * 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <div className="arrow-up"></div>
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton;
