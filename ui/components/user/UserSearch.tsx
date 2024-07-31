import {
	Card,
	Button,
	Group,
	Stack,
	Text,
	TextInput,
	Select,
	Table,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import classes from '@/ui/components/Login.module.css';
import { notifications } from '@mantine/notifications';
import { AppUserType } from '@/common/types/types';

const UserSearch = () => {
	const [result, setResult] = useState<AppUserType[]>();
	const router = useRouter();
	const [searching, setSearching] = useState<boolean>(false);

	const form = useForm({
		initialValues: {
			userId: '',
			userName: '',
			userType: '',
		},
	});

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		form.validate();
		if (!form.isValid()) {
			return;
		}

		try {
			setSearching(true);
			const resp = await fetch('/api/usersearch', {
				method: 'POST',
				body: JSON.stringify(form.getValues()),
			});

			const json = await resp.json();

			if (resp.ok) {
				setResult(json.result);
			} else {
				const message = json?.message || 'Not result found';
				notifications.show({ title: 'Search', message });
			}
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'something went wrong';
			notifications.show({ title: 'Search Error', message });
		} finally {
			setSearching(false);
		}
	};

	const rows =
		result &&
		result.length > 0 &&
		result.map((r) => (
			<Table.Tr key={r.id}>
				<Table.Td>
					<Link
						className={classes.register}
						href="#"
						onClick={(e) => {
							e.preventDefault();
							router.push(`/adminhome/user?id=${r.id}`);
						}}
					>
						{r.userId}
					</Link>
				</Table.Td>
				<Table.Td>{r.firstName}</Table.Td>
				<Table.Td>{r.lastName}</Table.Td>
				<Table.Td>{r.userType}</Table.Td>
			</Table.Tr>
		));

	return (
		<Group align="start">
			<Card
				style={{
					display: 'flex',
					width: '450px',
				}}
				ml="sm"
				shadow="md"
				radius="md"
				withBorder
			>
				<Text size="lg" fw={800}>
					Search user.
				</Text>

				<form onSubmit={handleLogin}>
					<Stack>
						<TextInput
							label="Login / User ID"
							placeholder="Enter user id to search"
							key={form.key('userId')}
							{...form.getInputProps('userId')}
							radius="md"
						/>
						<TextInput
							label="User Name"
							placeholder="User Name to search"
							key={form.key('userName')}
							{...form.getInputProps('userName')}
							radius="md"
						/>
						<Select
							label="User Type"
							placeholder="Select User Type"
							data={['Student', 'Mentor', 'HOD', 'Admin']}
							key={form.key('userType')}
							{...form.getInputProps('userType')}
							clearable
						/>
					</Stack>

					<Group justify="flex-end" mt="xl" px="xl">
						<Button type="submit" disabled={searching} radius="xl" px="xl">
							Search
						</Button>
					</Group>
				</form>
			</Card>
			{result && (
				<Card
					style={{ flexGrow: 1 }}
					ml="sm"
					shadow="md"
					// padding="lg"
					radius="md"
					withBorder
				>
					<Text size="lg" fw={800}>
						Search Result
					</Text>
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>User Id</Table.Th>
								<Table.Th>First Name</Table.Th>
								<Table.Th>Last Name</Table.Th>
								<Table.Th>User Type</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</Card>
			)}
		</Group>
	);
};

export default UserSearch;
