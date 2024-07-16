"use client";
import { AppShell, Burger, Group, Tabs, Title } from "@mantine/core";
import Image from "next/image";
import LoginForm from "./LoginForm";
import classes from "./Login.module.css";

export default function Login() {
  return (
    <AppShell header={{ height: 100 }} padding="md" bg="gray.0">
      <AppShell.Header bg="blue.3">
        <Group>
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
      </AppShell.Header>

      <AppShell.Main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          // width: "600px",
        }}
      >
        <Tabs defaultValue="mentor">
          <Tabs.List>
            <Tabs.Tab value="mentor">Mentor</Tabs.Tab>
            <Tabs.Tab value="student">Student</Tabs.Tab>
            <Tabs.Tab value="hod">HoD Login</Tabs.Tab>
            <Tabs.Tab value="admin">Admin Login</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="mentor" pt="md">
            Mentor Login. please enter your credentials to loign
            <LoginForm userType="Mentor" />
          </Tabs.Panel>

          <Tabs.Panel value="student" pt="md">
            Student Login. please enter your credentials to loign
            <LoginForm userType="Student" />
          </Tabs.Panel>

          <Tabs.Panel value="hod" pt="md">
            HoD Login. please enter your credentials to loign
            <LoginForm userType="HOD" />
          </Tabs.Panel>

          <Tabs.Panel value="admin" pt="md">
            Admin Login. please enter your credentials to loign
            <LoginForm userType="Admin" />
          </Tabs.Panel>
        </Tabs>
      </AppShell.Main>
    </AppShell>
  );
}
