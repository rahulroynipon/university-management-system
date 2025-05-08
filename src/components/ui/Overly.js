import { cn } from "@/lib/cn";

export default function Overlay({ children, isOpen, onClose, className }) {
  return isOpen ? (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/50 cursor-pointer",
        className
      )}
      onClick={onClose}
    >
      {children}
    </div>
  ) : null;
}
