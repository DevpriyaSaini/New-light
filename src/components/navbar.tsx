"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from 'next/link';
import ThemeToggle from "@/app/components/ThemeToggle";

export function NavbarDemo() {
  const Router=useRouter();
  const navItems = [
    {
      name: "Teachers",
      link: "/Teachers",
    },
    {
      name: "Cultural-fest",
      link: "/Cultural-fest",
    },
    {
      name: "Academic-fest",
      link: "/Academic-fest",
    },
    {
      name: "Result",
      link: "/Reportcard",
    },
    
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const router = useRouter();
  return (
    <div className="relative w-full">
<Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-2">
          <NavbarButton 
            variant="secondary"
            onClick={() => router.push('/Admin')}
          >
            Admin
          </NavbarButton>
          <NavbarButton 
            variant="primary"
            onClick={() => router.push('/dashboard')}
          >
            Dashboard
          </NavbarButton>
          <ThemeToggle/>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex gap-5">
            <ThemeToggle/>
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              onClick={() => {
                router.push('/Admin');
                setIsMobileMenuOpen(false);
              }}
              variant="primary"
              className="w-full"
            >
              Admin
            </NavbarButton>
            <NavbarButton
              onClick={() => {
                router.push('/dashboard');
                setIsMobileMenuOpen(false);
              }}
              variant="primary"
              className="w-full"
            >
              Dashboard
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
      {/* Navbar */}
    </div>
  );
}


