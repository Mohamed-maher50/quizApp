"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRoomSchema } from "@/services/validation/CreateRoomValidator";
import { createRoomSchemaTypes } from "@/interfaces/interfaces.actions";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Loader2 } from "lucide-react";

import { useUser } from "@clerk/nextjs";
import { createNewRoomAction, getUserByClerk } from "@/actions";
import { getUser } from "@/actions/Users.actions";
import { currentUser } from "@clerk/nextjs/server";

const defaultValues: Partial<createRoomSchemaTypes> = {
  isPrivate: false,
};
const CreateRoomDialogForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<createRoomSchemaTypes>({
    resolver: zodResolver(createRoomSchema),
    defaultValues,
  });
  const { isSubmitting, isDirty } = form.formState;
  const isPrivate = useWatch({
    control: form.control,
    name: "isPrivate",
  });
  const { user } = useUser();
  const handleOnSubmit = async (values: createRoomSchemaTypes) => {
    if (!user) return;
    const mongoDBId = user.publicMetadata.mongoDBId as string;
    await createNewRoomAction({
      ...values,
      userId: mongoDBId,
    });
    setIsOpen(false);
    form.reset();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Button variant={"outline"} size={"lg"}>
          Create New Room
        </Button>
      </DialogTrigger>
      <DialogContent className="duration-500">
        <DialogHeader>
          <DialogTitle> Create New Exam Room</DialogTitle>
          <DialogDescription>
            Follow the steps to create and personalize your exam room.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleOnSubmit)}
            className="duration-500"
          >
            <FormField
              name={"title"}
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Room Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Room Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name={"description"}
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Room Description ( optional )"
                        {...field}
                        value={field.value || undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              name="isPrivate"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="flex items-center my-2 justify-between">
                    <FormLabel>isPrivate</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            {isPrivate && (
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Password (optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Set a password"
                          {...field}
                          value={field.value || undefined}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}{" "}
            <Button
              type="submit"
              className="mt-4 flex gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>Create</span>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomDialogForm;
