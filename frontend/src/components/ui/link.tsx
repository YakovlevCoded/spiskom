import type { ComponentChildren } from "preact";
import { useLocation } from "preact-iso";

import { cn } from "@/lib/utils";

interface LinkProps {
  href: string;
  class?: string;
  children: ComponentChildren;
}

export const Link = ({ href, class: className, children }: LinkProps) => {
  const { route } = useLocation();

  const handleClick = (event: MouseEvent) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    route(href);
  };

  return (
    <a href={href} class={cn(className)} onClick={handleClick}>
      {children}
    </a>
  );
};
