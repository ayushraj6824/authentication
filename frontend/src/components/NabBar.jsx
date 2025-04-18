import { Github, KeyRound, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAuthStore } from "../stores/useAuthStore";

const NabBar = () => {
  const { logout } = useAuthStore();
  return (
    <div className="px-4 py-2 border-b fixed z-10 bg-background w-full top-0 left-0">
      <div className="w-full max-w-screen-md m-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 aspect-square p-1 rounded-md bg-violet-700/30 text-violet-400 flex items-center justify-center">
            <KeyRound className="size-5" />
          </div>
          <h1 className="font-semibold text-sm">Auth App</h1>
        </div>

        <div className="flex gap-2">
          <a
            href="https://github.com/ayushraj6824/authentication.git"
            target="_blank"
          >
            <Button size="icon" variant="ghost">
              <Github />
            </Button>
          </a>

          <Button onClick={logout} size="icon" variant="ghost">
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NabBar;
