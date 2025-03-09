import * as React from "react";

export interface WebContactProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const WebContact: React.FC<Readonly<WebContactProps>> = ({
  name,
  email,
  subject,
  message,
}) => (
  <div>
    <h1>A New Website Contact!</h1>
    <p>
      <strong>Name:</strong> {name}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    <p>
      <strong>Subject:</strong> {subject}
    </p>
    <p>
      <strong>Message:</strong> {message}
    </p>
  </div>
);
