import {
  Paper,
  Title,
  Text,
  Box,
  NumberFormatter,
  Grid,
  Divider,
  Loader,
  Group,
} from "@mantine/core";
import classes from "./calculator.module.css";

export function Results({
  requiredCapital,
  targetPrice,
  stopPrice,
  expectedReturn,
  loading,
}: {
  requiredCapital: number;
  targetPrice: number;
  stopPrice: number;
  expectedReturn: number;
  loading: boolean;
}) {
  return (
    <Paper className={classes.paper} p="md" shadow="lg" mt="3em">
      <Group justify="space-between">
        <Title order={2}>Trade Plan</Title>
        {loading && <Loader size="sm" />}
      </Group>
      <Divider mb="xl" />
      <Box mb="sm">
        <Grid>
          <Grid.Col span={{ base: 7, sm: 4 }}>
            <Box>
              <Title order={4}>Target Sale Price:</Title>
              <Text size="sm" c="dimmed">
                Take your profit at this price
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 5, sm: 8 }}>
            <NumberFormatter
              prefix="$ "
              decimalScale={2}
              value={targetPrice?.toFixed(2) || 0}
              thousandSeparator
            />
          </Grid.Col>
        </Grid>
      </Box>
      <Box mb="sm">
        <Grid>
          <Grid.Col span={{ base: 7, sm: 4 }}>
            <Box>
              <Title order={4}>Stop Loss Price:</Title>
              <Text size="sm" c="dimmed">
                Get out of the trade at this price
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 5, sm: 8 }}>
            <NumberFormatter
              prefix="$ "
              decimalScale={2}
              value={stopPrice?.toFixed(2) || 0}
              thousandSeparator
            />
          </Grid.Col>
        </Grid>
      </Box>

      <Box mb="sm">
        <Grid>
          <Grid.Col span={{ base: 7, sm: 4 }}>
            <Box>
              <Title order={4}>Required Capital:</Title>
              <Text size="sm" c="dimmed">
                Cash required to enter the trade
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 5, sm: 8 }}>
            <NumberFormatter
              prefix="$ "
              decimalScale={2}
              value={requiredCapital?.toFixed(2) || 0}
              thousandSeparator
            />
          </Grid.Col>
        </Grid>
      </Box>

      <Box mb="sm">
        <Grid>
          <Grid.Col span={{ base: 7, sm: 4 }}>
            <Box>
              <Title order={4}>Expected Return:</Title>
              <Text size="sm" c="dimmed">
                Potential profit from the trade
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 5, sm: 8 }}>
            <NumberFormatter
              prefix="$ "
              decimalScale={2}
              value={expectedReturn?.toFixed(2) || 0}
              thousandSeparator
            />
          </Grid.Col>
        </Grid>
      </Box>
    </Paper>
  );
}
