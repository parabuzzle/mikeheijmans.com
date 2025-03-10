"use client";
import {
  Box,
  Text,
  Flex,
  NumberInput,
  type NumberInputProps,
  type TextProps,
} from "@mantine/core";
import { IconCurrencyDollar } from "@tabler/icons-react";
import classes from "./calculator.module.css";

export function NumberField({
  money,
  label,
  value,
  numberProps,
  textProps,
  onChange,
}: {
  money?: boolean;
  label: string;
  value: number;
  numberProps?: NumberInputProps;
  textProps?: TextProps;
  onChange: (value: number) => void;
}) {
  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="center"
      direction="row"
      wrap="wrap"
    >
      <Box w={150}>
        <Text mb="sm" {...textProps}>
          {label}:
        </Text>
      </Box>
      <Box mih={50} w={150}>
        <NumberInput
          leftSection={money ? <IconCurrencyDollar /> : null}
          value={value}
          onChange={(value) => onChange(value as number)}
          classNames={{ input: classes.input }}
          min={0}
          step={0.01}
          {...numberProps}
        />
      </Box>
    </Flex>
  );
}
