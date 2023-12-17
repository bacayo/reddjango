"use client";

import React from "react";
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
import { Label } from "@/components/ui/label";
import { Copy } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const CreateCommunityModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl border border-gray-200 bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-neutral-900 dark:text-gray-200 dark:hover:bg-neutral-700">
          Create a Community
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
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
            {/* <Label htmlFor="link" className="sr-only">
              Link
            </Label> */}
            <Input className="" defaultValue="r/" />
          </div>
        </div>
        <DialogFooter className="sm:justify-start  ">
          <DialogClose className="flex w-full items-center justify-start gap-2">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
            <Button type="button" variant="secondary">
              Create Community
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
