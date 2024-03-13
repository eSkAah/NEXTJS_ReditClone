"use server";

import type { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import z from "zod";
import { db } from "@/db";
import { paths } from "@/paths";

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
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  await new Promise((resolve) => setTimeout(resolve, 2500));

  const result: any = CreateTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be logged in to create a topic."],
      },
    };
  }
  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["An unknown error occurred."],
        },
      };
    }
  }

  revalidatePath(paths.homePath());
  redirect(paths.topicShow(topic.slug));
}
