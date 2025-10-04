
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

type EnrollmentEmailProps = {
  name: string;
  email: string;
  phone: string;
  programName: string;
};

export function EnrollmentEmail({
  name,
  email,
  phone,
  programName,
}: EnrollmentEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Training Enrollment: {programName}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                New Training Program Enrollment
              </Heading>
              <Text>A new user has enrolled in one of your training programs.</Text>
              <Hr />
              <Text><strong>Program:</strong> {programName}</Text>
              <Text><strong>Participant Name:</strong> {name}</Text>
              <Text><strong>Participant Email:</strong> {email}</Text>
              <Text><strong>Participant Phone:</strong> {phone}</Text>
              <Hr />
               <Text>Please follow up with the participant to provide next steps and payment information.</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
