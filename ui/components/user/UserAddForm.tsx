import { useAppContext } from '@/ui/store/AppWrapper';
import {
	Anchor,
	Card,
	Button,
	Divider,
	Group,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Select,
	Table,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import classes from '@/ui/components/Login.module.css';
import { notifications } from '@mantine/notifications';
import { AppUserType } from '@/common/types/types';

const UserAddForm = () => {
	const [userType, setUserType] = useState<string | null>('Admin');
	const searchParms = useSearchParams();
	const id = searchParms.get('id');
	const mode = id ? 'Edit' : 'Add';
	console.log(id, userType);
	const isMentor = 'Mentor' === userType;

	useEffect(() => {
		if (id) {
			fetch(`/api/user?id=${id}`)
				.then((res) => res.json())
				.then((data) => {
					form.setInitialValues(data);
					form.setValues(data);
				});
		}
	}, [id]);

	const form = useForm({
		initialValues: {
			userId: '',
			firstName: '',
			lastName: '',
			userDesignation: '',
			userPwd: '',
			userConfirmPwd: '',
			userType: '',
		},
		validate: {
			userId: (val) => (val && val.length > 1 ? null : 'Please enter User ID'),
			firstName: (val) =>
				val && val.length > 1 ? null : 'Please enter User First Name',
			lastName: (val) =>
				val && val.length > 1 ? null : 'Please enter User Last Name',
			userPwd: (val) =>
				val.length < 4 ? 'Password should be min of 4 chars' : null,
			userType: (val) =>
				val && val.length > 1 ? null : 'Please Select User Type',
		},
	});

	const handleUserTypeChange = (value: string | null) => {
		setUserType(value);
	};
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form.getValues());
		form.validate();
		if (!form.isValid()) {
			return;
		}

		const resp = await fetch('/api/user', {
			method: 'POST',
			body: JSON.stringify(form.getValues()),
		});

		const json = await resp.json();

		if (resp.ok) {
		} else {
			const message = json?.message || 'unexpected error in user add/edit';
			notifications.show({ title: 'User', message });
		}
	};

	return (
		<Group align="start">
			<Card
				style={{
					display: 'flex',
					// justifyContent: "center",
					// alignItems: "center",
					width: '750px',
				}}
				ml="sm"
				shadow="md"
				// padding="lg"
				radius="md"
				withBorder
			>
				<Text size="lg" fw={800}>
					{mode} user
				</Text>

				<form onSubmit={handleLogin}>
					<Stack>
						<Group>
							<Select
								style={{ width: '40%' }}
								label="User Type"
								placeholder="Select User Type"
								data={['Student', 'Mentor', 'HOD', 'Admin']}
								key={form.key('userType')}
								{...form.getInputProps('userType')}
								onChange={(e) => {
									handleUserTypeChange(e);
									if (form.getInputProps(`userType`).onChange)
										form.getInputProps(`userType`).onChange(e);
								}}
								clearable
							/>
							{isMentor && (
								<TextInput
									style={{ width: '40%' }}
									label="User Designation"
									placeholder="User Designation"
									key={form.key('userDesignation')}
									{...form.getInputProps('userDesignation')}
									radius="md"
								/>
							)}
						</Group>
						<TextInput
							style={{ width: '50%' }}
							label="Login / User ID"
							placeholder="Enter user id"
							key={form.key('userId')}
							{...form.getInputProps('userId')}
							radius="md"
						/>
						<Group>
							<PasswordInput
								style={{ width: '40%' }}
								label="Password"
								placeholder="Password"
								key={form.key('userPwd')}
								{...form.getInputProps('userPwd')}
								radius="md"
							/>
							<PasswordInput
								style={{ width: '40%' }}
								label="Confirm Password"
								placeholder="Confirm Password"
								key={form.key('userConfirmPwd')}
								{...form.getInputProps('userConfirmPwd')}
								radius="md"
							/>
						</Group>
						<Group>
							<TextInput
								style={{ width: '40%' }}
								label="User First Name"
								placeholder="User First Name"
								key={form.key('firstName')}
								{...form.getInputProps('firstName')}
								radius="md"
							/>
							<TextInput
								style={{ width: '40%' }}
								label="User Last Name"
								placeholder="User Last Name"
								key={form.key('lastName')}
								{...form.getInputProps('lastName')}
								radius="md"
							/>
						</Group>
					</Stack>

					<Group justify="flex-end" mt="xl" px="xl">
						<Button type="submit" radius="xl" px="xl">
							Save
						</Button>
					</Group>
				</form>
			</Card>
		</Group>
	);
};

export default UserAddForm;
