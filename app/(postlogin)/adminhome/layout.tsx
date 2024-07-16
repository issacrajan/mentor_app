"use client";

import Navbar from "@/components/nav/Navbar";
import { useAppContext } from "@/store/AppWrapper";
import { AppShell, Burger, Group, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IconUserBolt, IconKey, IconSettings } from "@tabler/icons-react";
import classes from "../Layout.module.css";
import UserMenu from "@/components/nav/UserMenu";
const linkData = [
  { link: "/adminhome/user", label: "Users", icon: IconUserBolt },
  { link: "/adminhome/resetpassword", label: "Reset Password", icon: IconKey },
  { link: "/adminhome/settings", label: "Other Settings", icon: IconSettings },
];

export default function AdminHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const [opened, { toggle }] = useDisclosure(false);

  const appContext = useAppContext();
  const router = useRouter();

  return (
    <AppShell
      header={{ height: 90 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
            <Image
              src="/header_logo.jpeg"
              alt="header logo"
              height={95}
              width={150}
            />
            <Title order={2} className={classes.title} ta="center" mt="sm">
              NITTE Mentor Maintenance
            </Title>
          </Group>
          <UserMenu />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg="var(--mantine-color-gray-2">
        <Navbar linkData={linkData} defaultSelection="Users" />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
