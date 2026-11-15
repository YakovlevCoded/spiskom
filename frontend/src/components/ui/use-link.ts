import { useLocation } from "preact-iso";

export const useAppLink = (href: string) => {
  const { route } = useLocation();

  const handleClick = (event: MouseEvent) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    route(href);
  };

  return { handleClick };
};
