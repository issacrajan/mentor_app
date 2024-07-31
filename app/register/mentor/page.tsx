'use client';
import { AppShell, Group, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import classes from '@/app/register/register.module.css';
import StudentRegister from '@/ui/components/student/Register';
function RegisterStudentPage() {
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
					display: 'block',
					// justifyContent: "stretch",
					// alignItems: "stretch",
					// width: "600px",
					border: '2px solid red',
				}}
			>
				<StudentRegister />
			</AppShell.Main>
		</AppShell>
	);
}

export default RegisterStudentPage;
