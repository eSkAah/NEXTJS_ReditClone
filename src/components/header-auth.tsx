"use client";

import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { auth } from "@/auth";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === "loading") {
    return (authContent = null);
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data?.user?.image || ""} />
        </PopoverTrigger>
        <PopoverContent>
          <NavbarItem>
            <Link href="/profile">Profile</Link>
          </NavbarItem>
          <NavbarItem>
            <form action={actions.signOut}>
              <Button type="submit" color="danger" variant="flat">
                Sign Out
              </Button>
            </form>
          </NavbarItem>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <form action={actions.signIn}>
          <NavbarItem>
            <Button type="submit" color="secondary">
              Sign In
            </Button>
          </NavbarItem>
        </form>

        <form action={actions.signOut}>
          <NavbarItem>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </form>
      </>
    );
  }

  return authContent;
}
