"use client";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  Box,
  Text,
  Drawer,
  Button,
  Group,
  TextInput,
  Textarea,
  ActionIcon,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { IconMail, IconEraser, IconSend } from "@tabler/icons-react";
import { sendWebContact } from "./actions";
import classes from "./styles.module.css";

export function Contact({ navClose }: { navClose?: () => void }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      subject: "",
      message: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      name: (value) => (value.trim() ? null : "Name is required"),
      subject: (value) => (value.trim() ? null : "Subject is required"),
      message: (value) => (value.trim() ? null : "Message is required"),
    },
  });

  const onSubmit = async (values: {
    email: string;
    name: string;
    subject: string;
    message: string;
  }) => {
    setLoading(true);
    const { error } = await sendWebContact({
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
    });

    if (error) {
      setLoading(false);
      notifications.show({
        color: "red",
        title: "An Error Occurred",
        message:
          "It appears there was an error sending your message, please try again.",
      });
      return;
    }

    setLoading(false);

    if (navClose) {
      navClose();
    }

    close();

    notifications.show({
      color: "indigo",
      title: "Message Sent",
      message: "Your message has been sent successfully.",
    });

    form.reset();
  };

  return (
    <Box>
      <Drawer
        opened={opened}
        position="right"
        onClose={close}
        closeOnClickOutside={true}
        size="xl"
        overlayProps={{ backgroundOpacity: 0.7, blur: 4 }}
        title={
          <Text fw={900} size="xl">
            Contact
          </Text>
        }
      >
        <Text c="dimmed" size="sm">
          Send a message using the form below.
        </Text>

        <Box p="xl">
          <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <TextInput
              mb="xs"
              withAsterisk
              radius="xs"
              classNames={
                !form.getInputProps("name").error
                  ? { input: classes.input }
                  : {}
              }
              placeholder="Your Name"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />

            <TextInput
              mb="xs"
              withAsterisk
              radius="xs"
              placeholder="Your Email"
              classNames={
                !form.getInputProps("email").error
                  ? { input: classes.input }
                  : {}
              }
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <TextInput
              mb="xs"
              withAsterisk
              radius="xs"
              placeholder="Subject"
              classNames={
                !form.getInputProps("subject").error
                  ? { input: classes.input }
                  : {}
              }
              key={form.key("subject")}
              {...form.getInputProps("subject")}
            />
            <Textarea
              mb="lg"
              withAsterisk
              radius="xs"
              autosize
              resize="vertical"
              minRows={10}
              placeholder="Message"
              classNames={
                !form.getInputProps("message").error
                  ? { input: classes.input }
                  : {}
              }
              key={form.key("message")}
              {...form.getInputProps("message")}
            />
            <Group justify="flex-end" mt="md">
              <Button
                leftSection={<IconEraser />}
                color="red"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button
                color="violet"
                loading={loading}
                leftSection={<IconSend />}
                type="submit"
              >
                Send Message
              </Button>
            </Group>
          </form>
        </Box>
      </Drawer>

      <ActionIcon
        onClick={open}
        radius="xl"
        size="lg"
        variant="gradient"
        title="Contact Me"
        aria-label="Contact Mike"
      >
        <IconMail />
      </ActionIcon>
    </Box>
  );
}

export default Contact;
