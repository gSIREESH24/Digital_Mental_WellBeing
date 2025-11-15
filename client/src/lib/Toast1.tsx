import { createRoot } from "react-dom/client";
import {
  Toast as ToastComponent,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
  ToastProvider,
} from "@/components/ui/toast";

/**
 * Global toast popup function — can be called anywhere
 */
export function Toast({
  title,
  description,
  variant = "default",
}: {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}) {
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = createRoot(container);

  // Cleanup after 3 seconds
  setTimeout(() => {
    root.unmount();
    document.body.removeChild(container);
  }, 3000);

  root.render(
    <ToastProvider>
      <ToastComponent
        variant={variant}
        className="fixed top-4 right-4 z-[9999] max-w-sm w-full animate-in fade-in slide-in-from-top-full shadow-lg rounded-md"
      >
        <div className="p-4">
          <ToastTitle>{title}</ToastTitle>
          {description && <ToastDescription>{description}</ToastDescription>}
        </div>
        <ToastClose />
      </ToastComponent>
      <ToastViewport />
    </ToastProvider>
  );
}
