"use client";
import {
  Box,
  Text,
  Flex,
  NumberInput,
  type NumberInputProps,
  type TextProps,
} from "@mantine/core";
import { IconCurrencyDollar, IconPercentage } from "@tabler/icons-react";
import classes from "./calculator.module.css";

export function NumberField({
  money,
  label,
  value,
  percent,
  numberProps,
  textProps,
  onChange,
}: {
  money?: boolean;
  percent?: boolean;
  label: string;
  value: number;
  numberProps?: NumberInputProps;
  textProps?: TextProps;
  onChange: (value: number) => void;
}) {
  const leftSection = () => {
    if (money) {
      return <IconCurrencyDollar />;
    } else if (percent) {
      return <IconPercentage />;
    }
    return;
  };

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
          leftSection={leftSection()}
          value={value}
          onChange={(value) => onChange(value as number)}
          classNames={{ input: classes.input }}
          min={0}
          step={percent ? 1 : 0.01}
          max={percent ? 100 : undefined}
          {...numberProps}
        />
      </Box>
    </Flex>
  );
}
