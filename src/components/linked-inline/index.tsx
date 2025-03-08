import Link from "next/link";
import classes from "./link.module.css";
import type { LinkProps } from "next/link";

export default function LinkedInline({
  href,
  target,
  linkProps,
  children,
}: Readonly<{
  href: string;
  linkProps?: LinkProps;
  target?: string;
  children?: React.ReactNode;
}>) {
  return (
    <Link href={href} target={target} {...linkProps} className={classes.link}>
      {children}
    </Link>
  );
}
