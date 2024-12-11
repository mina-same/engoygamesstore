"use client";

import Link from "next/link";
import { NavbarActions } from "./navbar-actions";
import { Container } from "./ui/container";
import Image from "next/image";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkProvider,
} from "@clerk/nextjs";
import { FaHome, FaShoppingCart, FaThList, FaPhoneAlt } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useState, startTransition } from "react";
import { ClipLoader } from "react-spinners"; // Importing the spinner
import { useTranslations, useLocale } from "next-intl"; // Importing the translation hook
import { MdOutlineLanguage } from "react-icons/md";

// Navbar component
export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [hovered, setHovered] = useState<number | null>(null);
  const [loading, setLoading] = useState(false); // Loading state

  // Use the translation hook to get translations for navbar
  const t = useTranslations("navbar");

  // Determine current language from the path
  const currentLanguage = useLocale();
  const nextLanguage = currentLanguage === "en" ? "ar" : "en"; // Toggle between 'en' and 'ar'

  // Language switcher handler
  const onLanguageSelect = (lang: string) => {
    setLoading(true); // Start loading spinner

    // Perform the locale switch
    startTransition(() => {
      const currentPathname = pathname.replace(/^\/(en|ar)/, ""); // Remove existing locale prefix
      router.replace(`/${lang}${currentPathname}`); // Add the new locale
      setLoading(false); // Stop the spinner after the transition
    });
  };

  // Helper to detect active link
  const isActive = (path: string) => pathname === path;

  return (
    <div className="bg-dark mx-[100px] relative z-50">
      <Container>
        <div className="flex h-[100px] justify-between items-center px-4 sm:px-6 lg:px-8">
          {/* Navbar actions: Clerk (Sign-in, User button) + Cart */}
          <div className="flex items-center gap-6 text text-white">
            <ClerkProvider>
              <SignedOut>
                <SignInButton/>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <NavbarActions />
            </ClerkProvider>

            {/* Language Switcher Button */}
            <button
              onClick={() => onLanguageSelect(nextLanguage)} // Change language on click
              disabled={loading} // Disable button while loading
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold bg-white text-black hover:bg-gray-200 transition duration-300 ${loading ? "cursor-wait" : ""}`}
            >
              <MdOutlineLanguage className="text-lg" />
              {loading ? (
                <span className="flex items-center gap-2">
                  <ClipLoader size={12} color="#000" loading={loading} /> {/* Spinner */}
                  Switching...
                </span>
              ) : (
                <span>{currentLanguage == "ar" ? "English" : "عربي"}</span>
              )}
            </button>
          </div>

          {/* Main navigation */}
          <div className="flex items-center mr-12">
            <div className="flex items-center gap-[30px]">
              {[ 
                { href: `/${currentLanguage}/contact`, label: t("contact"), icon: <FaPhoneAlt /> },
                { href: `/${currentLanguage}/category`, label: t("category"), icon: <FaThList /> },
                { href: `/${currentLanguage}/shop`, label: t("shop"), icon: <FaShoppingCart /> },
                { href: `/${currentLanguage}`, label: t("home"), icon: <FaHome /> }
              ].map((link, index) => (
                <div key={index} className="relative flex flex-col items-center w-200px">
                  <Link
                    href={link.href}
                    className={`text-xs font-extrabold font-['Cairo'] flex items-center gap-2 transition-colors duration-300 ${
                      isActive(link.href) ? "text-white" : "text-white"
                    } ${hovered === index ? "text-gray-300" : ""}`}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {link.icon} {link.label}
                  </Link>
                  {isActive(link.href) && (
                    <div
                      className="absolute top-5 w-[40px] h-[2px] bg-white transition-all duration-300"
                      style={{ left: "50%", transform: "translateX(-50%)" }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div className="flex items-center z-15 cursor-pointer relative gap-4">
            <Link href="/" className="flex items-center">
              <Image
                className="w-[120px] h-[120px] mr-4"
                src="/svg/logo2.svg"
                alt="Logo"
                width={70}
                height={67}
              />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};