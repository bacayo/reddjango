"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Session } from "@/lib/types";
import RedditLogoMobile from "@/public/images/redditLogoMobile.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setModalOpen, setModalState } from "@/redux/slices/modalState";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LoginForm, SignUpForm } from "./AuthForm";
import NavbarUserDropdown from "./NavbarUserDropdown";

interface NavbarProps {
  session: Session | undefined;
}

const Navbar = ({ session }: NavbarProps) => {
  const { theme, setTheme } = useTheme();
  const dispatch = useAppDispatch();
  const { modalOpen, modalState } = useAppSelector((state) => state.modalState);

  const LoginDialog = (
    <DialogContent className="h-screen sm:max-w-md md:h-fit">
      <DialogHeader className="text-left">
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <LoginForm />
      </div>
      <DialogFooter className="sm:justify-start">
        {/* <DialogClose asChild> */}
        <footer className="flex flex-col gap-2 text-sm">
          <p className="text-sm">
            Forgot your{" "}
            <span className="cursor-pointer text-blue-600">username</span> or{" "}
            <span className="cursor-pointer text-blue-600">password</span>?
          </p>
          <p className="text-sm">
            New to Reddit?{" "}
            <span
              onClick={() => dispatch(setModalState("signup"))}
              className="cursor-pointer text-blue-600"
            >
              Sign Up
            </span>
          </p>
        </footer>
        {/* </DialogClose> */}
      </DialogFooter>
    </DialogContent>
  );

  const SignUpDialog = (
    <DialogContent className="h-screen sm:max-w-md md:h-fit">
      <DialogHeader className="text-left">
        <DialogTitle>Sign Up</DialogTitle>
        <DialogDescription>
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <SignUpForm />
      </div>
      <DialogFooter className="sm:justify-start">
        {/* <DialogClose asChild> */}
        <footer className="flex flex-col gap-2 text-sm">
          <p className="text-sm">
            Already a redditor?{" "}
            <span
              onClick={() => dispatch(setModalState("login"))}
              className="cursor-pointer text-blue-600"
            >
              Login
            </span>
          </p>
        </footer>
        {/* </DialogClose> */}
      </DialogFooter>
    </DialogContent>
  );

  return (
    // <nav className="bg-primary-foreground px-2 py-4 sticky top-0 w-screen z-10">
    <nav className="sticky top-0 z-10 bg-primary-foreground px-2 py-4">
      <ul className="flex items-center justify-around">
        <div className="flex items-center gap-2">
          <Image src={RedditLogoMobile} alt="logo" width={40} height={40} />
          <Image
            src={"/images/ReddDjangoLogo.svg"}
            alt="redditText"
            width={70}
            height={80}
            className="hidden md:block"
          />
        </div>
        <div className="relative flex w-3/5 items-center md:w-2/4">
          <Search className="absolute left-3" size={20} />
          <Input
            className="rounded-xl indent-6"
            placeholder="search reddit..."
          />
        </div>
        {!session ? (
          <Dialog
            open={modalOpen}
            onOpenChange={() => dispatch(setModalOpen())}
          >
            <DialogTrigger asChild>
              <div className="flex items-center justify-center sm:w-40">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </div>
            </DialogTrigger>
            {modalState === "login" ? LoginDialog : SignUpDialog}
          </Dialog>
        ) : (
          // <LogoutForm />
          <NavbarUserDropdown session={session} />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
