import * as React from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function MegaMenu({ trigger, children, className }: MegaMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {trigger}
        <LazyMotion features={domAnimation}>
          {isOpen && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "absolute left-0 right-0 z-50 mt-2 w-screen max-w-screen-xl rounded-xl border bg-background p-6 shadow-lg",
                className
              )}
            >
              {children}
            </m.div>
          )}
        </LazyMotion>
      </div>
    </div>
  );
}

export function MegaMenuSection({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

export function MegaMenuLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "block rounded-lg p-3 text-sm hover:bg-muted transition-colors",
        className
      )}
    >
      {children}
    </a>
  );
}