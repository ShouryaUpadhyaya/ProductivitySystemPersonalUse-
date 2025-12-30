"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart, Timer, ListChecks } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/pomodoro", label: "Pomodoro", icon: Timer },
  { href: "/stats", label: "Stats", icon: BarChart },
  { href: "/todo", label: "To-Do", icon: ListChecks },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2">
      <div className="group">
        <div className="h-4 w-full absolute bottom-full"></div> {/* Invisible hover area */}
        <nav className="flex items-center justify-center gap-4 rounded-t-lg bg-card p-4 shadow-lg transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0 hover:translate-y-0">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex flex-col items-center gap-1 ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                } hover:text-primary transition-colors`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
