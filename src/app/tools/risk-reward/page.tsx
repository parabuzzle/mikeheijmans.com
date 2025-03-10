import { Metadata } from "next";
import { Container, Box, Text, Title } from "@mantine/core";
import { Calculator } from "@/components/tools/risk-calc";

export const metadata: Metadata = {
  title: "Risk:Reward Trading Calculator",
  description:
    "This tool is designed to help you plan a trade using a risk:reward ratio. Simply input the entry price, the amount you are willing to risk, and the amount of shares you want to buy. The calculator will generate a trade plan for you.",
};

export default function Page() {
  return (
    <Container>
      <Box>
        <Title order={1}>Risk:Reward Trading Calculator</Title>

        <Text c="dimmed" mb="md">
          {metadata.description}
        </Text>

        <Calculator />
      </Box>
    </Container>
  );
}
