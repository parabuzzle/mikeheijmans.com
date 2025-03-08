import type { ProjectCardData } from "@/components/projects";

export const Projects = [
  {
    title: "Engineering Hell",
    description:
      "Engineering Hell is a blog that I started in late 2024 to write about the trials and tribulations of being an engineer in the tech industry. I write about the things that I've learned, the things that I've built, and the things that I've broken and how I fixed them. The blog is meant to be a community project and is open to others who want to share their stories.",
    active: true,
    image: "/projects/ehell.png",
    imageAlt: "Engineering Hell Logo",
    links: [
      {
        link: "https://www.engineeringhell.com",
        name: "Website",
        target: "_blank",
      },
      {
        link: "https://github.com/parabuzzle/engineeringhell",
        name: "Source",
        target: "_blank",
      },
    ],
  },
  {
    title: "IgorBox",
    description:
      "In May of 2023, my wife started an electronics company to build the first cloud-based wireless animatronics controller. I helped design and build the prototypes and MVP. The system is ESP32 based using the ESP-IDF. Lots of really neat stuff happening with IgorBox. I got to use my Electrical Engineering skills to design the PCBs and developed the base operation system in embedded C.",
    active: true,
    image: "/projects/ibox.png",
    imageAlt: "ESP-IDF Logo",
    links: [
      {
        link: "https://www.igorbox.com",
        name: "Website",
        target: "_blank",
      },
      {
        link: "https://help.igorbox.com",
        name: "Docs",
        target: "_blank",
      },
    ],
  },
  {
    title: "MikeHeijmans.com",
    description:
      "This website! Yes, this is a project. I continue to use it as a way to play with new web frameworks and libraries. For example, I wanted to play with Next.js with motion...  so I built this website. This website will continue to evolve as I play with new things.",
    active: true,
    image: "/projects/next.png",
    imageAlt: "NextJS Logo",
    links: [
      {
        link: "https://www.mikeheijmans.com",
        name: "Website",
        target: "_blank",
      },
      {
        link: "https://github.com/parabuzzle/mikeheijmans.com",
        name: "Source",
        target: "_blank",
      },
    ],
  },
  {
    title: "ESP-IDF HTTP Rest Client",
    description:
      "Because the ESP-IDF provided client library is robust, it also means its a bit complicated and for most people, we only need some simple http operations for interacting with REST endpoints. You shouldn't need to know how to manage chunked vs non-chunked responses or how to construct the required connection config to post a json object. I just want the ENTIRE response body loaded in a buffer I provide to do with what I want. And i don't want to copy around 40 lines of code for every request to do it!",
    active: true,
    image: "/projects/espressif.png",
    imageAlt: "ESP-IDF Logo",
    links: [
      {
        link: "https://github.com/parabuzzle/idf_http_rest_client/blob/main/README.md",
        name: "Docs",
        target: "_blank",
      },
      {
        link: "https://github.com/parabuzzle/idf_http_rest_client",
        name: "Source",
        target: "_blank",
      },
      {
        link: "https://components.espressif.com/components/parabuzzle/http_rest_client",
        name: "Espressif",
        target: "_blank",
      },
    ],
  },
  {
    title: "Linky",
    description:
      "Linky is your friendly intranet URL shortener. Its made to be simple to setup, simple to use, and simply useful. Linky is based off of a number of internal URL shorteners that exist in many large tech companies in the Silicon Valley.",
    active: false,
    image: "/projects/linky.png",
    imageAlt: "Linky Screenshot",
    links: [
      {
        link: "https://github.com/parabuzzle/linky/blob/master/README.md",
        name: "Docs",
        target: "_blank",
      },
      {
        link: "https://github.com/parabuzzle/linky",
        name: "Source",
        target: "_blank",
      },
      {
        link: "https://hub.docker.com/r/parabuzzle/linky/",
        name: "DockerHub",
        target: "_blank",
      },
    ],
  },
  {
    title: "CraneOperator",
    description:
      "Just as crane operators can see where all the containers are in the shipyard, CraneOperator gives you a simple web interface for browsing around a Docker Registry running version 2.0+",
    active: false,
    image: "/projects/docker.png",
    imageAlt: "CraneOperator Screenshot",
    links: [
      {
        link: "http://github.com/parabuzzle/craneoperator/blob/master/README.md",
        name: "Docs",
        target: "_blank",
      },
      {
        link: "http://github.com/parabuzzle/craneoperator",
        name: "Source",
        target: "_blank",
      },
      {
        link: "http://hub.docker.com/r/parabuzzle/craneoperator/",
        name: "DockerHub",
        target: "_blank",
      },
    ],
  },
] as ProjectCardData[];

export default Projects;
