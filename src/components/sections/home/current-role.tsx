"use client";
import { Box, Text } from "@mantine/core";

export function CurrentRole() {
  return (
    <Box>
      <Text size="xl" mb="lg" fw={500}>
        I&apos;m currently the Director of Platform Technology at Tradweb
        Markets LLC where I lead multiple teams of engineers responsible for the
        interface between the business application development teams and the
        infrastructure that runs their applications. This includes the
        development and maintenance of the build and runtime environments,
        observability, SDLC, CI/CD systems, the Kubernetes-based PaaS that
        supports the company&apos;s various businesses, and the cloud
        strategy/infrastructure.
      </Text>
    </Box>
  );
}
