"use server";
import {
  WebContact,
  type WebContactProps,
} from "@/components/contact/templates";
import React from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWebContact({
  name,
  email,
  subject,
  message,
}: WebContactProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "contact@mikeheijmans.com",
      to: process.env.CONTACT_EMAIL as string,
      subject: "New Contact Form Submission",
      react: WebContact({ name, email, subject, message }) as React.ReactNode,
    });
    if (error) {
      return { error };
    }
    return { data };
  } catch (error) {
    return { error };
  }
}

//export async function POST() {
//  try {
//    const { data, error } = await resend.emails.send({
//      from: "Acme <onboarding@resend.dev>",
//      to: ["delivered@resend.dev"],
//      subject: "Hello world",
//      react: WebContact({ name, email, subject, message }),
//    });
//
//    if (error) {
//      return Response.json({ error }, { status: 500 });
//    }
//
//    return Response.json(data);
//  } catch (error) {
//    return Response.json({ error }, { status: 500 });
//  }
//}
