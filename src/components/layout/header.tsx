"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, LogIn, UserPlus, ChevronDown, User, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/contexts/User";
import { AuthLogin } from "@/components/auth/Login";
import { logout } from "@/app/actions/auth";

const menuItems = [
  { label: "Surf Report", href: "/report" },
  // { label: "Surf Report", href: "/surfline" },
  { label: "About", href: "/about" },
  // { label: "Schedule", href: "/schedule" },
  // { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const { isAuthenticated, logout: contextLogout } = useUser();

  const handleLogout = async () => {
    contextLogout();
    await logout();
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex flex-1 items-center justify-start min-w-0">
        <Link href="/" className="text-xl font-bold flex flex-row gap-2 items-center">
          <Image src="/kayaker-wave.svg" alt="Kayaker Wave" width={64} height={64} className="object-fit mx-auto"/>
          <span>Brennan&apos;s Wave</span>
        </Link>
      </div>
      <NavigationMenu className="hidden md:flex flex-1 justify-center">
        <NavigationMenuList className="flex gap-1">
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-1 items-center justify-end gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 p-3 mt-16">
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} className="text-lg font-medium">
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Image src="/kayaker-wave.svg" alt="Kayaker Wave" width={64} height={64} className="object-fit mx-auto"/>
              <small className="block">Version 0.0.1</small>
              <small>&copy; {new Date().getFullYear()} Brennan&apos;s Wave</small>
            </div>
          </SheetContent>
        </Sheet>
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="hidden md:flex gap-1.5" variant="outline">
                Account
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <AuthLogin
              trigger={
                <Button className="hidden md:flex gap-2" variant="default">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              }
            />
            <Button className="hidden md:flex gap-2" variant="outline" asChild>
              <Link href="/register">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
