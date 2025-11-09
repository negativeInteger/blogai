"use client";

import { SignIn, SignUp } from "@clerk/nextjs";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface AuthModalProps {
  mode: "signIn" | "signUp";
  onClose: () => void;
}

export default function AuthModal({ mode, onClose }: AuthModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative bg-transparent p-12 rounded-2xl shadow-xl">
        {mode === "signIn" ? (
          <div className="relative">
            <SignIn
              routing="hash"
              forceRedirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                },
              }}
            />
            <Button
              onClick={onClose}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        ) : (
          <div className="relative">
            <SignUp
              routing="hash"
              forceRedirectUrl="/dashboard"
              appearance={{
                elements: {
                  formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
                },
              }}
            />
            <Button
              onClick={onClose}
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
