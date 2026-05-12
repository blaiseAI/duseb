"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
  children?: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer";
  className?: string;
  style?: CSSProperties;
};

export default function Reveal({ children, as: Tag = "div", className = "", style }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "-30px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const TagAny = Tag as unknown as "div";
  return (
    <TagAny ref={ref} className={`reveal ${className}`} style={style}>
      {children}
    </TagAny>
  );
}
