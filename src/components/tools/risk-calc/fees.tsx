"use client";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Box, Text, Grid, Switch, Collapse } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { NumberField } from "./number-field";

export function Fees({
  buyFee,
  sellFee,
  feeSimple,
  setBuyFee,
  setSellFee,
  setFeeSimple,
}: {
  buyFee: number;
  sellFee: number;
  feeSimple?: boolean;
  setBuyFee: (value: number) => void;
  setSellFee: (value: number) => void;
  setFeeSimple: (value: boolean) => void;
}) {
  const [open, { toggle }] = useDisclosure();
  const [linked, setLinked] = useState(true);

  const handleBuyFeeChange = (value: number) => {
    const num = Number(value);
    if (linked) {
      setSellFee(num);
    }
    setBuyFee(num);
  };

  const handleSellFeeChange = (value: number) => {
    const num = Number(value);
    if (linked) {
      setBuyFee(num);
    }
    setSellFee(num);
  };

  const handleFeeSimpleChange = (value: boolean) => {
    // reset the fees to 0 when switching mode
    setBuyFee(0);
    setSellFee(0);

    setFeeSimple(value);
  };

  return (
    <Box mt="lg" mb="lg">
      <Text ta="right" onClick={toggle} style={{ cursor: "pointer" }} size="lg">
        {open ? "Hide" : "Adjust"} Trading Fees{" "}
        {open ? <IconChevronUp /> : <IconChevronDown />}
      </Text>
      <Collapse
        mt="xl"
        in={open}
        transitionDuration={100}
        transitionTimingFunction="linear"
      >
        <Grid>
          <Grid.Col span={6}>
            <NumberField
              label="Buy Fee"
              value={buyFee}
              onChange={handleBuyFeeChange}
              money={feeSimple}
              percent={!feeSimple}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberField
              label="Sell Fee"
              value={sellFee}
              onChange={handleSellFeeChange}
              money={feeSimple}
              percent={!feeSimple}
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={12}>
            <Switch
              checked={linked}
              label="Link Fees"
              onChange={(event) => {
                setLinked(event.currentTarget.checked);
              }}
            />
            <Text c="dimmed" size="sm">
              When enabled, both buy and sell fees will be the same and will
              update together.
            </Text>
            <Switch
              mt="md"
              checked={!feeSimple}
              label="Percentage Based Fees"
              onChange={(event) => {
                handleFeeSimpleChange(!event.currentTarget.checked);
              }}
            />
            <Text c="dimmed" size="sm">
              When enabled, fees will be calculated as a percentage of the
              transaction value.
            </Text>
          </Grid.Col>
        </Grid>
      </Collapse>
    </Box>
  );
}
