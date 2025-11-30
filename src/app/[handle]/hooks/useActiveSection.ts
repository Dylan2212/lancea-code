import { useEffect, useState } from "react";

export default function useActiveSection(sections: Record<string, React.RefObject<HTMLElement | null>>) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const scroll = window.scrollY + window.innerHeight * 0.60;

      for (const id in sections) {
        const el = sections[id]?.current;
        if (!el) continue;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (scroll >= top && scroll < bottom) {
          setActive(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  return active;
}