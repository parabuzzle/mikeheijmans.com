"use client";
import { useEffect, useState } from "react";
import { Box, Text, Grid } from "@mantine/core";
import { NumberField } from "./number-field";
import { RiskSlider } from "./risk-slider";
import { Direction } from "./direction";
import { Results } from "./results";

export function Calculator() {
  const [price, setPrice] = useState(18.42);
  const [ratio, setRatio] = useState(3);
  const [long, setLong] = useState(true);
  const [acceptableLoss, setAcceptableLoss] = useState(500);
  const [numberOfShares, setNumberOfShares] = useState(1000);
  const [requiredCapital, setRequiredCapital] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);
  const [stopPrice, setStopPrice] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(0);
  const [loading, setLoading] = useState(true);

  const calculate = () => {
    setLoading(true);
    if (price === 0 || ratio === 0 || numberOfShares === 0) {
      setRequiredCapital(0);
      setTargetPrice(0);
      setStopPrice(0);
      setExpectedReturn(0);
      setLoading(false);
      return;
    }

    const capital = price * numberOfShares;
    const ret = acceptableLoss * ratio;

    setRequiredCapital(capital);
    setExpectedReturn(ret);

    if (long) {
      setStopPrice((capital - acceptableLoss) / numberOfShares);
      setTargetPrice((capital + ret) / numberOfShares);
    } else {
      setStopPrice((capital + acceptableLoss) / numberOfShares);
      setTargetPrice((capital - ret) / numberOfShares);
    }
    setLoading(false);
  };

  useEffect(() => {
    calculate();
  }, [price, ratio, long, acceptableLoss, numberOfShares]);

  const changeRatio = (value: number) => {
    setRatio(value);
  };

  return (
    <Box mt="3em">
      <Box mb="lg">
        <Grid>
          <Grid.Col span={6}>
            <NumberField
              label="Entry Price"
              value={price}
              onChange={setPrice}
              money
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberField
              label="Number of Shares"
              value={numberOfShares}
              onChange={setNumberOfShares}
              numberProps={{ step: 50 }}
            />
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={6}>
            <NumberField
              label="Acceptable Loss"
              value={acceptableLoss}
              onChange={setAcceptableLoss}
              numberProps={{ step: 50, min: 0 }}
              money
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Direction value={long} onChange={setLong} />
          </Grid.Col>
        </Grid>
      </Box>
      <Box>
        <Text mb="sm">Risk:Reward Ratio:</Text>
        <RiskSlider ratio={ratio} setRatio={changeRatio} />
      </Box>
      <Results
        targetPrice={targetPrice}
        requiredCapital={requiredCapital}
        stopPrice={stopPrice}
        expectedReturn={expectedReturn}
        loading={loading}
      />
    </Box>
  );
}
