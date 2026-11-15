import { cn } from "@/lib/utils";
import type { LinkProps } from "@/types/ui";

import { useAppLink } from "./use-link";

export const Link = ({ href, class: className, children }: LinkProps) => {
  const { handleClick } = useAppLink(href);

  return (
    <a href={href} class={cn(className)} onClick={handleClick}>
      {children}
    </a>
  );
};
