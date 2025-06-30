import React, { PropsWithChildren } from "react";

function getAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}

export const H1 = ({ children }: PropsWithChildren): React.ReactNode => {
  const anchor = getAnchor(children as string);
  const link = `#${anchor}`;
  return (
    <h1 id={anchor}>
      <a href={link} className="anchor-link">
        §
      </a>
      {children}
    </h1>
  );
};

export const H2 = ({ children }: PropsWithChildren): React.ReactNode => {
  const anchor = getAnchor(children as string);
  const link = `#${anchor}`;
  return (
    <h2 id={anchor}>
      <a href={link} className="anchor-link">
        §
      </a>
      {children}
    </h2>
  );
};

export const H3 = ({ children }: PropsWithChildren): React.ReactNode => {
  const anchor = getAnchor(children as string);
  const link = `#${anchor}`;
  return (
    <h3 id={anchor}>
      <a href={link} className="anchor-link">
        §
      </a>
      {children}
    </h3>
  );
};

export const H4 = ({ children }: PropsWithChildren): React.ReactNode => {
  const anchor = getAnchor(children as string);
  const link = `#${anchor}`;
  return (
    <h4 id={anchor}>
      <a href={link} className="anchor-link">
        §
      </a>
      {children}
    </h4>
  );
};
