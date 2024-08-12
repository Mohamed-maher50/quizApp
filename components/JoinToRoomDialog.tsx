"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm, useWatch } from "react-hook-form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { JoinToRoomSchemaTypes } from "@/interfaces/interfaces.actions";
import { JoinToRoomSchema } from "@/services/validation/JoinToRoomValidator";
import SubmitButton from "@/app/SubmitButton";
import { Switch } from "./ui/switch";
import { joinToRoomAction } from "@/actions/Rooms";

const JoinToRoomDialog = ({ userId }: { userId: string }) => {
  const form = useForm<JoinToRoomSchemaTypes>({
    resolver: zodResolver(JoinToRoomSchema),
  });
  const isPrivate = useWatch({
    control: form.control,
    name: "isPrivate",
  });

  const onSubmit = async (data: JoinToRoomSchemaTypes) => {
    await joinToRoomAction({
      ...data,
      password: data.password ? data.password : null,
      userId,
    });
    // form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"}>Join To Room</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8  rounded-md"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Room Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between items-center">
              <FormField
                control={form.control}
                name="isPrivate"
                render={({ field }) => (
                  <FormItem className="items-center w-full justify-between flex">
                    <div className="flex flex-col">
                      <FormLabel>Is Private</FormLabel>
                      <FormDescription>
                        If Room Not Has not Password Check Switch Button
                      </FormDescription>
                    </div>

                    <FormControl>
                      <Switch
                        onCheckedChange={field.onChange}
                        defaultChecked={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem
                  style={{
                    display: isPrivate ? "block" : "none",
                  }}
                >
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Room Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton isLoading={form.formState.isSubmitting}>
              Join
            </SubmitButton>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinToRoomDialog;
