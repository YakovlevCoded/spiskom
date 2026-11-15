import { X } from "lucide-preact";
import type { ComponentChildren } from "preact";
import { useEffect, useId, useRef } from "preact/hooks";

import { cn } from "@/lib/utils";

import { Button } from "./button";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ComponentChildren;
  class?: string;
}

export const Dialog = ({
  open,
  onClose,
  title,
  description,
  children,
  class: className,
}: DialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);

    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      class={cn(
        "m-auto max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-3xl border border-border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-transparent",
        className,
      )}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div class="dialog-enter p-6 sm:p-7">
        <div class="mb-6 flex items-start justify-between gap-4">
          <div class="space-y-1.5">
            <h2 id={titleId} class="text-xl font-extrabold tracking-[-0.03em]">
              {title}
            </h2>
            {description ? (
              <p id={descriptionId} class="text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          <Button variant="ghost" size="icon" aria-label="Закрыть" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        {children}
      </div>
    </dialog>
  );
};
