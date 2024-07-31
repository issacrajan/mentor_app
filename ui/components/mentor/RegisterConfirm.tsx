'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Divider, Group, Stack, Tabs, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './Register.module.css';
import { StudentDetailType } from '@/common/types/types';
import Link from 'next/link';

function MentorRegConfirm() {
	const [rec, setRec] = useState<StudentDetailType>();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');

	useEffect(() => {
		async function fetchAPI() {
			try {
				const resp = await fetch(`/api/mentor/register?id=${id}`, {
					method: 'GET',
				});

				const json = await resp.json();
				console.log(json);
				if (resp.ok) {
					setRec(json);
				} else {
					const message =
						json?.message || 'Something went wrong in fetching mentor detail';
					notifications.show({ title: 'Error', message });
				}
			} catch (error) {
				console.log(error);
				notifications.show({
					title: 'Registration Error',
					message: 'error fetching registration detail',
				});
			}
		}
		fetchAPI();
	}, [id]);

	const router = useRouter();
	const [showGuardian, setShowGuardian] = useState<boolean>(true);

	return (
		<Stack gap="0">
			<Title order={1}>Mentor Registration - Successful</Title>
			<Divider my="xs" />
			<Group gap={70} align="flex-start">
				<Text ta="left" mt="md">
					Your login Id: {rec?.mentor?.userId}
				</Text>
				<Text ta="left" mt="md">
					Click here to go to{' '}
					<Link
						className={classes.loginPage}
						href="#"
						onClick={(e) => {
							e.preventDefault();
							router.push('/?usertype=Mentor');
						}}
					>
						Login
					</Link>
				</Text>
			</Group>

			<Group gap={70} align="flex-start">
				<div>
					<Text fw={700} fz="h2" className={classes.title}>
						Mentor Name:
					</Text>
					<Text c="dimmed" fz="lg">
						{rec?.mentor?.fullName}
					</Text>
				</div>
				<div>
					<Text fw={700} fz="h2" className={classes.title}>
						Hod Name
					</Text>
					<Text c="dimmed" fz="lg">
						{rec?.mentor?.hodName}
					</Text>
				</div>
				<div>
					<Text fw={700} fz="h2" className={classes.title}>
						Email ID
					</Text>
					<Text c="dimmed" fz="lg">
						{rec?.student?.emailId}
					</Text>
				</div>
			</Group>
		</Stack>
	);
}

export default MentorRegConfirm;
