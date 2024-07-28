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

function StudentRegister() {
	const router = useRouter();
	const appContext = useAppContext();
	const [active, setActive] = useState(1);
	const [accommodation, setAccommodation] = useState('');
	const [showGuardian, setShowGuardian] = useState<boolean>(true);

	const form = useForm({
		initialValues: {
			student: {
				userId: '',
				userPwd: '',
				userConfirmPwd: '',
				fullName: '',
				usn: '',
				studentDOB: null,
				studentGender: 'Female',
				studentRank: undefined,
				admissionCategory: 'CET',
				accommodation: 'DayScholar',
				mobileNumber: '',
				emailId: '',
				bloodGroup: '',
			},
			parent: {
				fatherName: '',
				motherName: '',
				occupation: '',
				currentAddress: '',
				emailId: '',
				mobileNumber: '',
			},
			guardian: {
				guardianName: '',
				occupation: '',
				currentAddress: '',
				emailId: '',
				mobileNumber: '',
			},
		},
		validate: {
			student: {
				fullName: (val) =>
					val && val.length >= 1 ? null : 'Please enter name',
				usn: (val) => (val && val.length >= 1 ? null : 'Please enter USN'),
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

		const resp = await fetch('/api/student/register', {
			method: 'POST',
			body: JSON.stringify(form.getValues()),
		});

		const json = await resp.json();
		if (resp.ok) {
			const studentObj = { ...json };
			console.log(studentObj);
			const id: string = studentObj.student.id;
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
				<Title order={1}>Student Registration</Title>
				<Divider my="xs" />
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
							<Group>
								<TextInput
									label="Full Name"
									placeholder="Full Name"
									key={form.key('student.fullName')}
									{...form.getInputProps('student.fullName')}
								/>
								<TextInput
									label="USN"
									placeholder="USN"
									key={form.key('student.usn')}
									{...form.getInputProps('student.usn')}
								/>
								<DateInput
									clearable
									defaultValue={new Date()}
									label="Date of Birth"
									valueFormat="DD/MM/YYYY"
									placeholder="Date of Birth"
									key={form.key('student.studentDOB')}
									{...form.getInputProps('student.studentDOB')}
								/>
								<Radio.Group
									name="gender"
									label="Gender"
									withAsterisk
									key={form.key('student.studentGender')}
									{...form.getInputProps('student.studentGender')}
								>
									<Group mt="xs">
										<Radio value="Male" label="Male" />
										<Radio value="Female" label="Female" />
									</Group>
								</Radio.Group>
							</Group>
							<Group>
								<TextInput
									label="CET/COMEDK Rank"
									placeholder="CET/COMEDK Rank"
									key={form.key('student.studentRank')}
									{...form.getInputProps('student.studentRank')}
								/>
								<Radio.Group
									name="admissionCategory"
									label="Admission Category"
									withAsterisk
									key={form.key('student.admissionCategory')}
									{...form.getInputProps('student.admissionCategory')}
								>
									<Group mt="xs">
										<Radio value="Management" label="Management" />
										<Radio value="Payment" label="Payment" />
										<Radio value="CET" label="CET" />
									</Group>
								</Radio.Group>
							</Group>
							<Group>
								<Radio.Group
									name="accommodation"
									label="Accommodation"
									value={accommodation}
									withAsterisk
									key={form.key('student.accommodation')}
									{...form.getInputProps('student.accommodation')}
								>
									<Group mt="xs">
										<Radio value="DayScholar" label="Day Scholar" />
										<Radio value="Hostel" label="Hostel" />
										<Radio value="PayingGuest" label="Paying Guest" />
									</Group>
								</Radio.Group>
							</Group>
							<Group>
								<TextInput
									label="Mobile Number"
									placeholder="Mobile Number"
									key={form.key('student.mobileNumber')}
									{...form.getInputProps('student.mobileNumber')}
								/>
								<TextInput
									label="Email ID"
									placeholder="Email ID"
									key={form.key('student.emailId')}
									{...form.getInputProps('student.emailId')}
								/>
								<TextInput
									label="Blood Group"
									placeholder="Blood Group"
									key={form.key('student.bloodGroup')}
									{...form.getInputProps('student.bloodGroup')}
								/>
							</Group>

							<Group>
								<TextInput
									label="Login Id"
									placeholder="Login Id"
									key={form.key('student.userId')}
									{...form.getInputProps('student.userId')}
								/>
								<TextInput
									label="Password"
									placeholder="Password"
									key={form.key('student.userPwd')}
									{...form.getInputProps('student.userPwd')}
								/>
								<TextInput
									label="Confirm Password"
									placeholder="Confirm Password"
									key={form.key('student.userConfirmPwd')}
									{...form.getInputProps('student.userConfirmPwd')}
								/>
							</Group>
						</Stack>
					</Tabs.Panel>
					<Tabs.Panel value="parent">
						<Stack ml={10} mih={320} w={600}>
							<Group>
								<TextInput
									flex={1}
									label="Father Name"
									placeholder="Father Name"
									key={form.key('parent.fatherName')}
									{...form.getInputProps('parent.fatherName')}
								/>
								<TextInput
									flex={1}
									label="Mother Name"
									placeholder="Mother Name"
									key={form.key('parent.motherName')}
									{...form.getInputProps('parent.motherName')}
								/>
							</Group>

							<Group>
								<TextInput
									flex={1}
									label="Occupation"
									placeholder="Occupation"
									key={form.key('parent.occupation')}
									{...form.getInputProps('parent.occupation')}
								/>
								<TextInput
									flex={1}
									label="Current Address"
									placeholder="Current Address"
									key={form.key('parent.currentAddress')}
									{...form.getInputProps('parent.currentAddress')}
								/>
							</Group>

							<Group>
								<TextInput
									flex={1}
									label="Email Id"
									placeholder="Email Id"
									key={form.key('parent.emailId')}
									{...form.getInputProps('parent.emailId')}
								/>
								<TextInput
									flex={1}
									label="Mobile"
									placeholder="Mobile"
									key={form.key('parent.mobileNumber')}
									{...form.getInputProps('parent.mobileNumber')}
								/>
							</Group>
						</Stack>
					</Tabs.Panel>
					<Tabs.Panel value="guardian">
						<Stack ml={10} mih={320} w={600}>
							<Group>
								<TextInput
									flex={1}
									label="Guardian Name"
									placeholder="Guardian Name"
									key={form.key('guardian.guardianName')}
									{...form.getInputProps('guardian.guardianName')}
								/>
							</Group>

							<Group>
								<TextInput
									flex={1}
									label="Occupation"
									placeholder="Occupation"
									key={form.key('guardian.occupation')}
									{...form.getInputProps('guardian.occupation')}
								/>
								<TextInput
									flex={1}
									label="Current Address"
									placeholder="Current Address"
									key={form.key('guardian.currentAddress')}
									{...form.getInputProps('guardian.currentAddress')}
								/>
							</Group>

							<Group>
								<TextInput
									flex={1}
									label="Email Id"
									placeholder="Email Id"
									key={form.key('guardian.emailId')}
									{...form.getInputProps('guardian.emailId')}
								/>
								<TextInput
									flex={1}
									label="Mobile"
									placeholder="Mobile"
									key={form.key('guardian.mobileNumber')}
									{...form.getInputProps('guardian.mobileNumber')}
								/>
							</Group>
						</Stack>
					</Tabs.Panel>
				</Tabs>

				<Group justify="flex-start" mt="xl" ml="170" px="xl">
					<Button type="submit" radius="xl" px="xl">
						Register
					</Button>
				</Group>
			</Stack>
		</form>
	);
}

export default StudentRegister;
