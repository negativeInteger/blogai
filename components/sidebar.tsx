"use client";

import { useUser } from "@clerk/nextjs";
import { History, Menu, PenSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { name: "Generate New", href: "/dashboard", icon: PenSquare },
  { name: "History", href: "/dashboard/history", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <>
      {/* 🟣 Desktop: Static Sidebar */}
      <aside className="p-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className=" w-64">
            <SheetHeader>
              <SheetTitle className="text-2xl">
                Hi, {user?.firstName}
              </SheetTitle>
            </SheetHeader>
            {links.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href} // close sheet on link click
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-muted",
                  pathname === href
                    ? "bg-muted font-semibold"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="w-5 h-5" />
                {name}
              </Link>
            ))}
          </SheetContent>
        </Sheet>
      </aside>
    </>
  );
}
