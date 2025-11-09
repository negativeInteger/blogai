import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export default function Navbar({
  setAuthMode,
}: {
  setAuthMode: (mode: "signIn" | "signUp" | null) => void;
}) {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 border-b">
      <h1 className="text-2xl font-bold">BlogAI</h1>
      <div className="flex gap-4 items-center">
        <ModeToggle />
        <Button onClick={() => setAuthMode("signIn")}>Sign In</Button>
        <Button onClick={() => setAuthMode("signUp")}>Sign Up</Button>
      </div>
    </header>
  );
}
