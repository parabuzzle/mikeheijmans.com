"use client";
import { Box, Text, Slider } from "@mantine/core";

const lowReturn = 1.8;
const tooHighReturn = 3.1;

export function RiskSlider({
  ratio,
  setRatio,
}: {
  ratio: number;
  setRatio: (value: number) => void;
}) {
  const ratioExlained = () => {
    if (ratio > tooHighReturn) {
      return "A ratio greater than 3 is considered to be an unrealistic target";
    }
    if (ratio < lowReturn) {
      return "A ratio less than 2 is considered to be a high risk trade with a low reward";
    }
    return "This is a normal risk:reward ratio";
  };

  const slicerColor = () => {
    if (ratio > tooHighReturn) {
      return "red";
    }
    if (ratio < lowReturn) {
      return "yellow";
    }
    return "indigo";
  };

  return (
    <Box mt="lg">
      <Slider
        color={slicerColor()}
        size="xl"
        min={1}
        max={5}
        step={0.1}
        value={ratio}
        label={(value) => `1 : ${value}`}
        onChange={(value) => setRatio(value as number)}
        mb="md"
        marks={[
          { value: 2, label: "1:2" },
          { value: 3, label: "1:3" },
          { value: 4, label: "1:4" },
        ]}
      />
      <Text size="md" fs="italic">
        {ratioExlained()}
      </Text>
    </Box>
  );
}
