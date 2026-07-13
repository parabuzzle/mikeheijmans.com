"use client";
import { Box, List, Text } from "@mantine/core";

export function SiliconToCloud() {
  return (
    <Box>
      <Text mb="md" size="lg">
        As CTO of Rising Orchards I build IgorBox, a show-control platform for
        haunted attractions and live venues: cloud-connected controllers that
        drive the lights, motors, and DMX rigs on the floor. This is production
        engineering, not a weekend project, and I build every layer of it:
      </Text>
      <List mb="md" size="lg" spacing="sm">
        <List.Item>
          Firmware: ESP32 in C on ESP-IDF, with OTA updates, WiFi
          provisioning, and multicast coordination that keeps a venue full of
          controllers in sync.
        </List.Item>
        <List.Item>
          Hardware: schematic and PCB design in Altium, 4-layer boards taken
          from prototype through production.
        </List.Item>
        <List.Item>
          Interfacing: isolated RS-485 and DMX, motor drivers, and LED
          drivers. Unglamorous work, but it&apos;s what makes hardware safe
          and reliable enough to run a show with a paying audience in the
          room.
        </List.Item>
        <List.Item>
          Regulatory: FCC and ISED certification, the difference between a
          working prototype and a product you can legally ship.
        </List.Item>
        <List.Item>
          Cloud: a Next.js platform on Vercel that authors and sequences
          shows, then deploys them to a fleet of networked controllers in the
          field.
        </List.Item>
      </List>
      <Text mb="md" size="lg" fs="italic" c="dimmed">
        Roughly twenty years of platform and infrastructure engineering behind
        the software; the hardware is where I get to build the whole thing
        from the copper up.
      </Text>
    </Box>
  );
}
