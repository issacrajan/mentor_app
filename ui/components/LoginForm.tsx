import { useAppContext } from '@/ui/store/AppWrapper';
import {
  Anchor,
  Button,
  Card,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import classes from './Login.module.css';
import { notifications } from '@mantine/notifications';

const LoginForm = ({ userType }: { userType: string }) => {
  const router = useRouter();
  const appContext = useAppContext();
  const isStudentLogin = 'Student' === userType || 'Mentor' === userType;
  const form = useForm({
    initialValues: {
      loginId: '',
      loginPwd: '',
      userType: userType,
    },
    validate: {
      loginId: (val) =>
        val && val.length > 1 ? null : 'Please enter login ID',
      loginPwd: (val) =>
        val.length < 4 ? 'Password should be min of 4 chars' : null,
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form.getValues());
    form.validate();
    if (!form.isValid()) {
      return;
    }

    const resp = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(form.getValues()),
    });

    const json = await resp.json();
    if (resp.ok) {
      const userObj = { ...json.user };
      console.log(userObj);
      const homePath: string = '/' + json.user.userType.toLowerCase() + 'home';
      userObj.homePath = homePath;
      appContext.setUser(userObj);

      router.push(homePath);
    } else {
      const message = json?.message || 'Something went wrong in login';
      notifications.show({ title: 'Login Error', message });
    }
    console.log(json);
  };

  return (
    <Card
      style={{
        display: 'flex',
        // justifyContent: "center",
        // alignItems: "center",
        width: '450px',
      }}
      mt="lg"
      shadow="md"
      padding="lg"
      radius="lg"
      withBorder
    >
      <Text size="lg" fw={800}>
        Welcome to {userType} Login.
      </Text>

      <form onSubmit={handleLogin}>
        <Stack>
          <TextInput
            label="Login ID"
            placeholder="student@nitte.com"
            key={form.key('loginId')}
            {...form.getInputProps('loginId')}
            radius="md"
          />
          <PasswordInput
            label="Password"
            key={form.key('loginPwd')}
            {...form.getInputProps('loginPwd')}
            radius="md"
          />
        </Stack>

        <Group justify="flex-end" mt="xl" px="xl">
          <Button type="submit" radius="xl" px="xl">
            Login
          </Button>
        </Group>
        {isStudentLogin && <Divider my="md" variant="dashed" />}
        {isStudentLogin && (
          <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            <Link
              className={classes.register}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                router.push(`/register/${userType.toLowerCase()}`);
              }}
            >
              Register
            </Link>
          </Text>
        )}
      </form>
    </Card>
  );
};

export default LoginForm;
