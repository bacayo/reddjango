"use client";

import Image from "next/image";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import { Session } from "@/lib/types";
import { LoginForm, SignUpForm } from "./AuthForm";
import LogoutForm from "./LogoutForm";
import Reddit from "@/public/images/Reddit.svg";
import RedditLight from "@/public/images/RedditLight.svg";
import RedditLogoMobile from "@/public/images/redditLogoMobile.svg";

interface NavbarProps {
  session: Session | undefined;
}

const Navbar = ({ session }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const [modalState, setModalState] = useState<"login" | "signup">("login");

  const LoginDialog = (
    <DialogContent className="sm:max-w-md h-screen md:h-fit">
      <DialogHeader className="text-left">
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <LoginForm setOpen={setOpen} setModalState={setModalState} />
      </div>
      <DialogFooter className="sm:justify-start">
        {/* <DialogClose asChild> */}
        <footer className="text-sm flex flex-col gap-2">
          <p className="text-sm">
            Forgot your{" "}
            <span className="text-blue-600 cursor-pointer">username</span> or{" "}
            <span className="text-blue-600 cursor-pointer">password</span>?
          </p>
          <p className="text-sm">
            New to Reddit?{" "}
            <span
              onClick={() => setModalState("signup")}
              className="text-blue-600 cursor-pointer"
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
    <DialogContent className="sm:max-w-md h-screen md:h-fit">
      <DialogHeader className="text-left">
        <DialogTitle>Sign Up</DialogTitle>
        <DialogDescription>
          By continuing, you agree to our User Agreement and acknowledge that
          you understand the Privacy Policy.
        </DialogDescription>
      </DialogHeader>
      <div className="flex items-center space-x-2">
        <SignUpForm setOpen={setOpen} setModalState={setModalState} />
      </div>
      <DialogFooter className="sm:justify-start">
        {/* <DialogClose asChild> */}
        <footer className="text-sm flex flex-col gap-2">
          <p className="text-sm">
            Already a redditor?{" "}
            <span
              onClick={() => setModalState("login")}
              className="text-blue-600 cursor-pointer"
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
    <nav className="bg-primary-foreground px-2 py-4 fixed top-0 w-screen z-10">
      <ul className="flex items-center justify-around">
        <div className="flex items-center gap-2">
          <Image src={RedditLogoMobile} alt="logo" width={40} height={40} />

          {theme === "light" ? (
            <Image
              src={RedditLight}
              alt="redditText"
              width={70}
              height={80}
              className="hidden md:block"
            />
          ) : (
            <Image
              src={Reddit}
              alt="redditText"
              width={70}
              height={80}
              className="hidden md:block"
            />
          )}
        </div>
        <div className="flex w-3/5 md:w-2/4 items-center relative">
          <Search className="absolute left-3" size={20} />
          <Input
            className="indent-6 rounded-xl"
            placeholder="search reddit..."
          />
        </div>
        {!session ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => setModalState("login")}
                variant="default"
                size="sm"
              >
                Login
              </Button>
            </DialogTrigger>
            {modalState === "login" ? LoginDialog : SignUpDialog}
          </Dialog>
        ) : (
          // <LogoutButton />
          <LogoutForm />
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
