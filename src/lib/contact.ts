export const PROJECT_TYPES = [
  "Website design",
  "Mobile app design",
  "Logo & brand identity",
  "Graphic design",
  "Print design",
  "Something else",
] as const;

export type ContactInput = {
  name: string;
  email: string;
  projectType: string;
  message: string;
  /** honeypot */
  company?: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the client form and the API route. */
export function validateContact(
  raw: unknown,
): { ok: true; data: ContactInput } | { ok: false; errors: ContactErrors } {
  const o = (raw ?? {}) as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const data: ContactInput = {
    name: str(o.name),
    email: str(o.email),
    projectType: str(o.projectType),
    message: str(o.message),
    company: str(o.company),
  };
  const errors: ContactErrors = {};
  if (data.name.length < 2) errors.name = "Please tell me your name.";
  if (data.name.length > 120) errors.name = "That name is a little long.";
  if (!EMAIL.test(data.email)) errors.email = "Please enter a valid email address.";
  if (!PROJECT_TYPES.includes(data.projectType as (typeof PROJECT_TYPES)[number]))
    errors.projectType = "Choose what you’d like to make.";
  if (data.message.length < 20) errors.message = "A sentence or two about the project helps (20+ characters).";
  if (data.message.length > 5000) errors.message = "Please keep it under 5,000 characters.";
  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
