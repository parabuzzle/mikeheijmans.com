"use client";
import { Box, Text, Flex, Switch, Group } from "@mantine/core";
import classes from "./calculator.module.css";

export function Direction({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
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
        <Text mb="sm">Position Direction:</Text>
      </Box>
      <Group gap="xs">
        <Box>
          <Switch
            checked={value}
            className={classes.switch}
            classNames={
              value
                ? undefined
                : {
                    track: classes.switchTrack,
                  }
            }
            onChange={(event) => {
              onChange(event.currentTarget.checked);
            }}
          />
        </Box>
        <Box>
          <Text>{value ? "Long" : "Short"}</Text>
        </Box>
      </Group>
    </Flex>
  );
}
