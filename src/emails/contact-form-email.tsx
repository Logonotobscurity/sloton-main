
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import { Tailwind } from "@react-email/components";

type ContactFormEmailProps = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export function ContactFormEmail({
  name,
  email,
  phone,
  subject,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Message from LOG_ON Website</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                New Contact Form Submission
              </Heading>
              <Text>You received the following message from your website's contact form.</Text>
              <Hr />
              <Text><strong>Name:</strong> {name}</Text>
              <Text><strong>Email:</strong> {email}</Text>
              <Text><strong>Phone:</strong> {phone}</Text>
              <Text><strong>Subject:</strong> {subject}</Text>
              <Hr />
              <Heading as="h2" className="text-lg">Message:</Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>This email was sent from the contact form on logon.com.ng</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
