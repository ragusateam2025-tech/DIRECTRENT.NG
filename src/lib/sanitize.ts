/**
 * Basic HTML sanitization — strips HTML tags from user input
 * to prevent XSS in email notifications and database entries.
 */
export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Strip HTML tags
    .replace(/&/g, '&amp;') // Encode ampersands
    .replace(/"/g, '&quot;') // Encode quotes
    .trim();
}

/**
 * Sanitize all string values in an object
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const sanitized = { ...obj };
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      (sanitized as Record<string, unknown>)[key] = sanitize(
        sanitized[key] as string
      );
    }
  }
  return sanitized;
}
