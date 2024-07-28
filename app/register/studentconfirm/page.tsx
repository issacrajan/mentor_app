'use client';
import { AppShell, Group, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';
import classes from '@/app/register/register.module.css';
import StudentRegisterConfirm from '@/ui/components/student/RegisterConfirm';
import { useRouter } from 'next/navigation';

function RegisterStudentConfirmPage() {
	const router = useRouter();
	return (
		<AppShell header={{ height: 100 }} padding="md" bg="gray.0">
			<AppShell.Header bg="blue.3">
				<Group>
					<Image
						src="/header_logo.jpeg"
						alt="header logo"
						height={95}
						width={150}
						style={{ cursor: 'pointer' }}
						onClick={(e) => {
							e.preventDefault();
							router.push('/');
						}}
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
				<StudentRegisterConfirm />
			</AppShell.Main>
		</AppShell>
	);
}

export default RegisterStudentConfirmPage;
