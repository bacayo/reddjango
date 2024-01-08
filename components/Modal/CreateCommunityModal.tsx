"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { z } from "zod";
import { communitySchema, createCommunity } from "@/actions/createCommunity";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Session } from "@/lib/types";
import { LoginDialog } from "../Navbar/Navbar";

interface CreateCommunityModalProps {
  session: Session;
}

const CreateCommunityModal = ({ session }: CreateCommunityModalProps) => {
  const form = useForm<z.infer<typeof communitySchema>>({
    resolver: zodResolver(communitySchema),
    defaultValues: {
      communityName: "r/",
      aboutContent: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl border border-gray-200 bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-neutral-700">
          Create a Community
        </Button>
      </DialogTrigger>
      {session ? (
        <DialogContent className="sm:max-w-md">
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              action={async (formdata: FormData) => {
                const res = await createCommunity(formdata);
                if (res?.data) {
                  console.log(res.data);
                }
                console.log(res?.error?.message);
              }}
            >
              <DialogHeader>
                <DialogTitle className=" pb-4">Create a community</DialogTitle>
                <Separator />
                <DialogDescription>
                  <DialogTitle>Name</DialogTitle>
                  <p className="pt-2 text-xs">
                    Community names including capitalization cannot be changed.
                  </p>
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  {/* <Input className="" defaultValue="r/" />
            <Input className="" placeholder="Add description" /> */}

                  <FormField
                    control={form.control}
                    name="communityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="aboutContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          tell us about your community{" "}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <Button type="submit">Submit</Button> */}
                </div>
              </div>
              <DialogFooter className="sm:justify-start  ">
                <DialogClose className="flex w-full items-center justify-start gap-2">
                  <Button type="button" variant="secondary">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant={form.formState.isValid ? "secondary" : "ghost"}
                  >
                    Create Community
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      ) : (
        <LoginDialog />
      )}
    </Dialog>
  );
};

export default CreateCommunityModal;
