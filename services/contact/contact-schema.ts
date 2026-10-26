export type ContactSubmission = {
  submissionId: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  website: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const submissionIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function parseContactSubmission(value: unknown): ContactSubmission | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const submission = {
    submissionId: text(input.submissionId),
    name: text(input.name),
    lastName: text(input.lastName),
    email: text(input.email).toLowerCase(),
    phone: text(input.phone),
    message: text(input.message),
    website: text(input.website),
  };

  if (!submissionIdPattern.test(submission.submissionId)) return null;
  if (submission.name.length < 2 || submission.name.length > 80) return null;
  if (submission.lastName.length < 2 || submission.lastName.length > 80) return null;
  if (!emailPattern.test(submission.email) || submission.email.length > 254) return null;
  if (submission.phone.length < 6 || submission.phone.length > 40) return null;
  if (submission.message.length > 4_000) return null;
  return submission;
}
