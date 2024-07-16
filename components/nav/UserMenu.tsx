import { useAppContext } from "@/store/AppWrapper";
import { Avatar, Group, Menu, Text, UnstyledButton, rem } from "@mantine/core";
import cx from "clsx";
import classes from "./UserMenu.module.css";
import {
  IconChevronDown,
  IconHeart,
  IconLogout,
  IconUserEdit,
} from "@tabler/icons-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { user, setUser } = useAppContext();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const router = useRouter();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
        >
          <Group gap={7}>
            <Avatar
              src={user.image}
              alt={user.userName}
              radius="xl"
              size={20}
            />
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.userName}
            </Text>
            <IconChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown maw={200} bg="blue.1">
        <Menu.Item
          onClick={() => router.push(`${user.homePath}/myprofile`)}
          leftSection={
            <IconUserEdit
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          My Profile
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          onClick={() => router.push("/")}
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
