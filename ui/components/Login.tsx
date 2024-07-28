'use client';
import { AppShell, Burger, Group, Tabs, Title } from '@mantine/core';
import Image from 'next/image';
import LoginForm from './LoginForm';
import classes from './Login.module.css';
import { useSearchParams } from 'next/navigation';

export default function Login() {
	const search = useSearchParams();
	const userType = search.get('usertype') || 'Mentor';
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
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'flex-start',
					// width: "600px",
				}}
			>
				<Tabs defaultValue={userType}>
					<Tabs.List>
						<Tabs.Tab value="Mentor">Mentor</Tabs.Tab>
						<Tabs.Tab value="Student">Student</Tabs.Tab>
						<Tabs.Tab value="HOD">HoD Login</Tabs.Tab>
						<Tabs.Tab value="Admin">Admin Login</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="Mentor" pt="md">
						Mentor Login. please enter your credentials to loign
						<LoginForm userType="Mentor" />
					</Tabs.Panel>

					<Tabs.Panel value="Student" pt="md">
						Student Login. please enter your credentials to loign
						<LoginForm userType="Student" />
					</Tabs.Panel>

					<Tabs.Panel value="HOD" pt="md">
						HoD Login. please enter your credentials to loign
						<LoginForm userType="HOD" />
					</Tabs.Panel>

					<Tabs.Panel value="Admin" pt="md">
						Admin Login. please enter your credentials to loign
						<LoginForm userType="Admin" />
					</Tabs.Panel>
				</Tabs>
			</AppShell.Main>
		</AppShell>
	);
}
