import { authFormSchema } from "@/lib/types";
import axios, { isAxiosError } from "axios";
import { z } from "zod";

export const communitySchema = z.object({
  communityName: z
    .string()
    .min(3, { message: "Community name must be at least 3 characters" })
    .max(40, {
      message: "Community name must be between 3 and 40 characters",
    }),
  aboutContent: z
    .string()
    .min(3, { message: "Add a description min 3 characters" })
    .max(100),
});

export async function createCommunity(formdata: FormData) {
  const values = communitySchema.parse({
    communityName: formdata.get("communityName"),
    aboutContent: formdata.get("aboutContent"),
  });

  try {
    const { data, status, statusText } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/communities/`,
      {
        name: values.communityName,
        about_content: values.aboutContent,
      },
    );
    return { data, status, statusText };
  } catch (error) {
    if (isAxiosError(error)) {
      return { error };
    }
  }
}
