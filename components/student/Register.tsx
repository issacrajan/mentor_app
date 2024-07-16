"use client";
import { useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Group,
  Radio,
  Stack,
  Stepper,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateInput } from "@mantine/dates";
import classes from "./Register.module.css";

function StudentRegister() {
  const [active, setActive] = useState(1);
  const [accommodation, setAccommodation] = useState("");

  const form = useForm({
    initialValues: {
      loginId: "",
      loginPwd: "",
      userType: "Student",
      studentFullName: "",
      student: {
        usn: "",
        birthDate: "",
        gender: "",
        cetOrComedkRank: "",
        admissionCategory: "",
        accommodation: "",
        mobileNumber: "",
        emailId: "",
        bloodGroup: "",
      },
      parent: {
        fatherName: "",
        motherName: "",
      },
      guardian: {
        guardianName: "",
        occupation: "",
        currentAddress: "",
      },
    },
    validate: {
      loginId: (val) =>
        val && val.length > 1 ? null : "Please enter login ID",
      loginPwd: (val) =>
        val.length < 4 ? "Password should be min of 4 chars" : null,
    },
  });

  return (
    <Stack gap="0">
      <Title order={1}>Student Registration</Title>
      <Divider my="xs" />
      <Tabs defaultValue="student" orientation="vertical" classNames={classes}>
        <Tabs.List>
          <Tabs.Tab value="student">Student Detail</Tabs.Tab>
          <Tabs.Tab value="parent">Parent Detail</Tabs.Tab>
          <Tabs.Tab value="marks">Marks</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="student">
          <Stack ml={10} mih={320}>
            <Group>
              <TextInput
                label="Full Name"
                placeholder="Full Name"
                key={form.key("studentFullName")}
                {...form.getInputProps("studentFullName")}
              />
              <TextInput
                label="USN"
                placeholder="USN"
                key={form.key("student.usn")}
                {...form.getInputProps("student.usn")}
              />
              <DateInput
                clearable
                defaultValue={new Date()}
                label="Date of Birth"
                valueFormat="DD/MM/YYYY"
                placeholder="Date of Birth"
                key={form.key("student.birthDate")}
                {...form.getInputProps("student.birthDate")}
              />
              <Radio.Group
                name="gender"
                label="Gender"
                withAsterisk
                key={form.key("student.gender")}
                {...form.getInputProps("student.gender")}
              >
                <Group mt="xs">
                  <Radio value="M" label="Male" />
                  <Radio value="F" label="Female" />
                </Group>
              </Radio.Group>
            </Group>
            <Group>
              <TextInput
                label="CET/COMEDK Rank"
                placeholder="CET/COMEDK Rank"
                key={form.key("student.cetOrComedkRank")}
                {...form.getInputProps("student.cetOrComedkRank")}
              />
              <Radio.Group
                name="admissionCategory"
                label="Admission Category"
                withAsterisk
                key={form.key("student.admissionCategory")}
                {...form.getInputProps("student.admissionCategory")}
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
                onChange={setAccommodation}
                withAsterisk
                key={form.key("student.accommodation")}
                {...form.getInputProps("student.accommodation")}
              >
                <Group mt="xs">
                  <Radio value="DayScholar" label="Day Scholar" />
                  <Radio value="Hostel" label="Hostel" />
                  <Radio value="PG" label="Paying Guest" />
                </Group>
              </Radio.Group>
            </Group>
            <Group>
              <TextInput
                label="Mobile Number"
                placeholder="Mobile Number"
                key={form.key("student.mobileNumber")}
                {...form.getInputProps("student.mobileNumber")}
              />
              <TextInput
                label="Email ID"
                placeholder="Email ID"
                key={form.key("student.emailId")}
                {...form.getInputProps("student.emailId")}
              />
              <TextInput
                label="Blood Group"
                placeholder="Blood Group"
                key={form.key("student.bloodGroup")}
                {...form.getInputProps("student.bloodGroup")}
              />
            </Group>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="parent">
          <Stack ml={10} mih={320}>
            <Group>
              <TextInput
                label="Father Name"
                placeholder="Father Name"
                key={form.key("parent.fatherName")}
                {...form.getInputProps("parent.fatherName")}
              />
              <TextInput
                label="Mother Name"
                placeholder="Mother Name"
                key={form.key("parent.motherName")}
                {...form.getInputProps("parent.motherName")}
              />
            </Group>
          </Stack>
        </Tabs.Panel>
        <Tabs.Panel value="marks">Settings tab content</Tabs.Panel>
      </Tabs>

      <Group justify="flex-start" mt="xl" ml="120" px="xl">
        <Button type="submit" radius="xl" px="xl">
          Save
        </Button>
      </Group>
    </Stack>
  );
}

export default StudentRegister;
