import { useState } from 'react';
import { z } from 'zod';

// Mock schema for contact form
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

// Mock hook since there's no actual backend
export function useSubmitContact() {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (data: ContactFormValues) => {
    setIsPending(true);
    setError(null);
    setIsSuccess(false);

    try {
      // Simulate network latency
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Validate just to be sure
      contactFormSchema.parse(data);
      
      console.log("Form submitted successfully:", data);
      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return { mutate, isPending, isSuccess, error, reset: () => setIsSuccess(false) };
}
