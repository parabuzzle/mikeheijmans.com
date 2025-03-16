"use client";
import { useEffect, useState } from "react";
import { Box, Text, Grid } from "@mantine/core";
import { NumberField } from "./number-field";
import { RiskSlider } from "./risk-slider";
import { Direction } from "./direction";
import { Results } from "./results";
import { Fees } from "./fees";
import { LookupModal } from "@/components/tiingo";
import type { TiingoTopofBookResults } from "@/components/tiingo/actions";

export interface CalculatorProps {
  initialPrice?: number;
  initialRatio?: number;
  isShort?: boolean;
  initialAcceptableLoss?: number;
  initialNumberOfShares?: number;
  initalBuyFee?: number;
  initialSellFee?: number;
  initalFeePercent?: boolean;
}

export function Calculator({
  initialPrice,
  initialRatio,
  isShort,
  initialAcceptableLoss,
  initialNumberOfShares,
  initalBuyFee,
  initialSellFee,
  initalFeePercent,
}: CalculatorProps) {
  const [price, setPrice] = useState(initialPrice || 18.42);
  const [ratio, setRatio] = useState(initialRatio || 3);
  const [long, setLong] = useState(!isShort);
  const [acceptableLoss, setAcceptableLoss] = useState(
    initialAcceptableLoss || 500
  );
  const [numberOfShares, setNumberOfShares] = useState(
    initialNumberOfShares || 1000
  );
  const [requiredCapital, setRequiredCapital] = useState(0);
  const [targetPrice, setTargetPrice] = useState(0);
  const [stopPrice, setStopPrice] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(0);
  const [loading, setLoading] = useState(true);
  const [buyFee, setBuyFee] = useState(initalBuyFee || 0);
  const [sellFee, setSellFee] = useState(initialSellFee || 0);
  const [feeSimple, setFeeSimple] = useState(!initalFeePercent);

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

    let capital = price * numberOfShares;
    let ret = acceptableLoss * ratio;

    if (feeSimple) {
      capital += buyFee;
      ret -= sellFee;
    } else {
      capital += (capital * (buyFee || 0)) / 100;
      ret -= (ret * sellFee) / 100;
    }

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
  }, [price, ratio, long, acceptableLoss, numberOfShares, buyFee, sellFee]);

  const changeRatio = (value: number) => {
    setRatio(value);
  };

  const updateData = (data: TiingoTopofBookResults) => {
    setPrice(data.tngoLast);
  };

  return (
    <Box mt="3em">
      <LookupModal callback={updateData} />

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
      <Fees
        buyFee={buyFee}
        sellFee={sellFee}
        feeSimple={feeSimple}
        setBuyFee={setBuyFee}
        setSellFee={setSellFee}
        setFeeSimple={setFeeSimple}
      />

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
