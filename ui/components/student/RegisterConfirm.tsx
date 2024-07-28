'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Divider, Group, Stack, Tabs, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from './Register.module.css';
import { StudentDetailType } from '@/common/types/types';
import Link from 'next/link';

function StudentRegisterConfirm() {
	const [rec, setRec] = useState<StudentDetailType>();
	const searchParams = useSearchParams();
	const id = searchParams.get('id');

	useEffect(() => {
		async function fetchAPI() {
			try {
				const resp = await fetch(`/api/student/register?id=${id}`, {
					method: 'GET',
				});

				const json = await resp.json();
				console.log(json);
				if (resp.ok) {
					setRec(json);
				} else {
					const message =
						json?.message || 'Something went wrong in fetching student detail';
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
			<Title order={1}>Student Registration - Successful</Title>
			<Divider my="xs" />
			<Group gap={70} align="flex-start">
				<Text ta="left" mt="md">
					Your login Id: {rec?.student?.userId}
				</Text>
				<Text ta="left" mt="md">
					Click here to go to{' '}
					<Link
						className={classes.loginPage}
						href="#"
						onClick={(e) => {
							e.preventDefault();
							router.push('/?usertype=Student');
						}}
					>
						Login
					</Link>
				</Text>
			</Group>

			<Tabs
				defaultValue="student"
				orientation="vertical"
				mt={20}
				classNames={classes}
			>
				<Tabs.List>
					<Tabs.Tab my={4} px={40} fz={24} value="student">
						Student Detail
					</Tabs.Tab>
					<Tabs.Tab my={4} px={40} fz={24} value="parent">
						Parent Detail
					</Tabs.Tab>
					{showGuardian && (
						<Tabs.Tab my={4} px={40} fz={24} value="guardian">
							Guardian Detail
						</Tabs.Tab>
					)}
				</Tabs.List>

				<Tabs.Panel value="student">
					<Stack ml={10} mih={320}>
						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Full Name:
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.student?.fullName}
								</Text>
							</div>
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									USN
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.student?.usn}
								</Text>
							</div>
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Birth Date
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.student?.studentDOB}
								</Text>
							</div>
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Gender
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.student?.studentGender}
								</Text>
							</div>
						</Group>
						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Admission Category
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.student?.admissionCategory}
								</Text>
							</div>
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Rank
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.student?.studentRank}
								</Text>
							</div>
						</Group>
						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Accommodation
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.student?.accommodation}
								</Text>
							</div>
						</Group>
						<Group></Group>

						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Mobile Number
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.student?.mobileNumber}
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
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Blood Group
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.student?.bloodGroup}
								</Text>
							</div>
						</Group>
					</Stack>
				</Tabs.Panel>
				<Tabs.Panel value="parent">
					<Stack ml={10} mih={320} w={600}>
						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Father Name
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.parent?.fatherName}
								</Text>
							</div>
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Mother Name
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.parent?.motherName}
								</Text>
							</div>
						</Group>

						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Occupation
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.parent?.occupation}
								</Text>
							</div>
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Current Address
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.parent?.currentAddress}
								</Text>
							</div>
						</Group>

						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Email Id
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.parent?.emailId}
								</Text>
							</div>
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Mobile Name
								</Text>
								<Text c="dimmed" fz="lg">
									{rec?.parent?.mobileNumber}
								</Text>
							</div>
						</Group>
					</Stack>
				</Tabs.Panel>
				<Tabs.Panel value="guardian">
					<Stack ml={10} mih={320} w={600}>
						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Guardian Name
								</Text>
								<Text c="dimmed" fz="lg" className={classes.description}>
									{rec?.guardian?.guardianName}
								</Text>
							</div>
						</Group>

						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Occupation
								</Text>
								<Text c="dimmed" fz="lg" className={classes.description}>
									{rec?.guardian?.occupation}
								</Text>
							</div>
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Current Address
								</Text>
								<Text c="dimmed" fz="lg" className={classes.description}>
									{rec?.guardian?.currentAddress}
								</Text>
							</div>
						</Group>

						<Group gap={70} align="flex-start">
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Email Id
								</Text>
								<Text c="dimmed" fz="lg" className={classes.description}>
									{rec?.guardian?.emailId}
								</Text>
							</div>
							<div>
								<Text fw={700} fz="h2" className={classes.title}>
									Mobile Name
								</Text>
								<Text c="dimmed" fz="lg" className={classes.description}>
									{rec?.guardian?.mobileNumber}
								</Text>
							</div>
						</Group>
					</Stack>
				</Tabs.Panel>
			</Tabs>
		</Stack>
	);
}

export default StudentRegisterConfirm;
