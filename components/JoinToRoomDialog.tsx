"use client";
import React, { useEffect, useState } from "react";
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
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { JoinToRoomSchemaTypes } from "@/interfaces/interfaces.actions";
import { JoinToRoomSchema } from "@/services/validation/JoinToRoomValidator";
import SubmitButton from "@/app/SubmitButton";
import { Switch } from "./ui/switch";
import { joinToRoomAction } from "@/actions";
import { useUser } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const JoinToRoomDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const form = useForm<JoinToRoomSchemaTypes>({
    resolver: zodResolver(JoinToRoomSchema),
    defaultValues: {},
  });
  const isPrivate = useWatch({
    control: form.control,
    name: "isPrivate",
  });
  const { toast } = useToast();
  const { user } = useUser();
  const userMongoDBId = user?.publicMetadata.mongoDBId as string;
  const onSubmit = async (data: JoinToRoomSchemaTypes) => {
    const { error } = await joinToRoomAction({
      ...data,
      password: data.password ? data.password : null,
      userId: userMongoDBId,
    });

    if (!error) {
      form.reset();
      setIsOpen(false);
      toast({
        title: error,
        duration: 3000,
        className: "bg-green-500 text-lg ",
      });
      return router.push("/dashboard/exams");
    }
    toast({
      title: error,
      duration: 3000,
      className: "bg-red-500 text-lg ",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogTrigger asChild onClick={() => setIsOpen(!isOpen)}>
        <Button size={"lg"}>Join To Room</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Join To Room By Code</DialogTitle>
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
