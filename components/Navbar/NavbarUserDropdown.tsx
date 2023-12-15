import { logout } from "@/actions/logout";
import { Session } from "@/lib/types";
import {
  ChevronDown,
  Eye,
  Flower,
  Github,
  LogOut,
  Plus,
  UserRound,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";
import Link from "next/link";

interface NavbarUserDropdownProps {
  session: Session;
}

const NavbarUserDropdown = ({ session }: NavbarUserDropdownProps) => {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          className="flex w-40 items-center justify-between px-2 py-2"
        >
          <div className="flex flex-col items-start gap-1 text-xs">
            <p>{session.username}</p>
            <div className="flex flex-row items-center gap-1">
              <Flower className="h-4 w-4" />
              <p className="text-muted-foreground">178 karma</p>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2 font-light">
          <UserRound className="h-4 w-4" />
          <p className="text-muted-foreground">My Stuff</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="pl-8">Profile</DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            className="items-center justify-between pl-8"
          >
            <p>Online Status</p>

            <Switch className="data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-input" />
          </DropdownMenuItem>
          <DropdownMenuItem className="pl-8">User Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex items-center gap-2 font-light">
          <Eye className="h-4 w-4" />
          <p className="text-muted-foreground">View Options</p>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
            }}
            className="items-center justify-between pl-8"
          >
            <p>Dark Mode</p>
            <Switch
              className="data-[state=checked]:bg-emerald-600 data-[state=unchecked]:bg-input"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>Create a Community</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Link className="bg-red-400" href="https://github.com/bacayo/reddjango">
          <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <form className=" w-full" action={logout}>
          <DropdownMenuItem>
            <button className="flex h-full w-full items-center">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavbarUserDropdown;
