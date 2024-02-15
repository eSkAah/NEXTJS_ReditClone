"use server";

import z from "zod";

const CreateTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z0-9-]+$/, {
      message: "Only lowercase letters, numbers, and hyphens are allowed.",
    }),
  description: z.string().min(3).max(255),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // TODO: Revalidate the homepage.

  const result = CreateTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  return {
    errors: {},
  };
}
