import { z } from 'zod';

/**
 * Nigerian phone number regex
 * Accepts: 0801234567, +2348012345678, 2348012345678
 */
export const nigerianPhoneRegex = /^(\+234|234|0)[789][01]\d{8}$/;

/**
 * Email validation schema
 */
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim();

/**
 * Nigerian phone number validation schema
 */
export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(nigerianPhoneRegex, 'Please enter a valid Nigerian phone number')
  .transform((val) => {
    // Normalize to +234 format
    const digits = val.replace(/\D/g, '');
    if (digits.startsWith('0')) {
      return `+234${digits.slice(1)}`;
    }
    if (digits.startsWith('234')) {
      return `+${digits}`;
    }
    return val;
  });

/**
 * Name validation schema
 */
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .trim();

/**
 * User type validation schema
 */
export const userTypeSchema = z.enum(['tenant', 'landlord'], {
  required_error: 'Please select whether you are a tenant or landlord',
});

/**
 * Launch area validation schema
 */
export const areaSchema = z.enum(['yaba', 'surulere'], {
  required_error: 'Please select an area',
});

/**
 * Message validation schema
 */
export const messageSchema = z
  .string()
  .min(1, 'Message is required')
  .min(10, 'Message must be at least 10 characters')
  .max(2000, 'Message must be less than 2000 characters')
  .trim();

/**
 * Subject validation schema
 */
export const subjectSchema = z
  .string()
  .min(1, 'Subject is required')
  .min(3, 'Subject must be at least 3 characters')
  .max(200, 'Subject must be less than 200 characters')
  .trim();

// ================================================
// FORM SCHEMAS
// ================================================

/**
 * Waitlist form schema
 */
export const waitlistSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  userType: userTypeSchema,
  area: areaSchema.optional(),
  referralSource: z.string().optional(),
});

export type WaitlistFormData = z.infer<typeof waitlistSchema>;

/**
 * Contact form schema
 */
export const contactSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal('')),
  subject: subjectSchema,
  message: messageSchema,
  userType: userTypeSchema.optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: emailSchema,
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

// ================================================
// API REQUEST SCHEMAS
// ================================================

/**
 * API error response schema
 */
export const apiErrorSchema = z.object({
  error: z.string(),
  code: z.string().optional(),
  details: z.record(z.string()).optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;

/**
 * API success response schema
 */
export const apiSuccessSchema = z.object({
  success: z.literal(true),
  message: z.string().optional(),
  data: z.unknown().optional(),
});

export type ApiSuccess = z.infer<typeof apiSuccessSchema>;

// ================================================
// VALIDATION HELPERS
// ================================================

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

/**
 * Validate Nigerian phone number
 */
export function isValidNigerianPhone(phone: string): boolean {
  return phoneSchema.safeParse(phone).success;
}

/**
 * Parse and validate form data
 */
export function parseFormData<T extends z.ZodSchema>(
  schema: T,
  data: unknown
): { success: true; data: z.infer<T> } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Format Zod errors for display
 */
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of error.issues) {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = issue.message;
    }
  }
  return errors;
}
