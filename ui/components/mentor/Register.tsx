'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	Button,
	Divider,
	Group,
	Radio,
	Stack,
	Tabs,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { useAppContext } from '@/ui/store/AppWrapper';
import classes from './Register.module.css';

function MentorRegister() {
	const router = useRouter();
	const appContext = useAppContext();
	const [active, setActive] = useState(1);
	const [accommodation, setAccommodation] = useState('');
	const [showGuardian, setShowGuardian] = useState<boolean>(true);

	const form = useForm({
		initialValues: {
			mentor: {
				userId: '',
				userPwd: '',
				userConfirmPwd: '',
				fullName: '',
				hodName: '',
			},
		},
		validate: {
			mentor: {
				fullName: (val) =>
					val && val.length >= 1 ? null : 'Please enter name',
				userId: (val) =>
					val && val.length > 1 ? null : 'Please enter login ID',
				userPwd: (val) =>
					val.length < 4 ? 'Password should be min of 4 chars' : null,
			},
		},
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(form.getValues());
		form.validate();
		if (!form.isValid()) {
			return;
		}

		const resp = await fetch('/api/mentor/register', {
			method: 'POST',
			body: JSON.stringify(form.getValues()),
		});

		const json = await resp.json();
		if (resp.ok) {
			const mentorObj = { ...json };
			console.log(mentorObj);
			const id: string = mentorObj.mentor.id;
			notifications.show({ title: 'Registration successful', message: id });
			router.push(`/register/studentconfirm?id=${id}`);
		} else {
			const message = json?.message || 'Something went wrong in registration';
			notifications.show({ title: 'Registration Error', message });
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack gap="0">
				<Title order={1}>Mentor Registration</Title>
				<Divider my="xs" />

				<Group>
					<TextInput
						label="Full Name"
						placeholder="Full Name"
						key={form.key('mentor.fullName')}
						{...form.getInputProps('mentor.fullName')}
					/>
					<TextInput
						label="HOD Name"
						placeholder="HOD Name"
						key={form.key('mentor.hodName')}
						{...form.getInputProps('mentor.hodName')}
					/>
				</Group>

				<Group>
					<TextInput
						label="Login Id"
						placeholder="Login Id"
						key={form.key('mentor.userId')}
						{...form.getInputProps('mentor.userId')}
					/>
					<TextInput
						label="Password"
						placeholder="Password"
						key={form.key('mentor.userPwd')}
						{...form.getInputProps('mentor.userPwd')}
					/>
					<TextInput
						label="Confirm Password"
						placeholder="Confirm Password"
						key={form.key('mentor.userConfirmPwd')}
						{...form.getInputProps('mentor.userConfirmPwd')}
					/>
				</Group>

				<Group justify="flex-start" mt="xl" ml="170" px="xl">
					<Button type="submit" radius="xl" px="xl">
						Register
					</Button>
				</Group>
			</Stack>
		</form>
	);
}

export default MentorRegister;
