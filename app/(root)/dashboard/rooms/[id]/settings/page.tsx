"use client";
import { deleteRoom, getRoomById, updateRoomAction } from "@/actions";
import SubmitButton from "@/app/SubmitButton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { createRoomSchemaTypes } from "@/interfaces/interfaces.actions";
import { createRoomSchema } from "@/services/validation/CreateRoomValidator";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { defaultValues, messages } from "./_constants";

interface IRoomSettingsProps {
  params: {
    id: string;
  };
}

const RoomSettings = ({ params: { id } }: IRoomSettingsProps) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const form = useForm<createRoomSchemaTypes>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: async () =>
      (await getRoomById({ roomId: id }, {})) || defaultValues,
  });

  const { isSubmitting, isLoading, isDirty } = form.formState;
  const isPrivate = useWatch({
    control: form.control,
    name: "isPrivate",
  });
  const { toast } = useToast();

  if (!isSignedIn && isLoaded) {
    router.push("/sign-in");
  }
  const mongoDBId = user?.publicMetadata.mongoDBId as string;
  const handleOnSubmit = async (values: createRoomSchemaTypes) => {
    await updateRoomAction({
      ...values,
      userId: mongoDBId,
      roomId: id,
      password: isPrivate ? values.password : undefined,
    });
  };
  const handleOnSubmitDelete = async (e: FormEvent) => {
    e.preventDefault();
    const result = await deleteRoom(id, mongoDBId);
    if (!result) return toast({ ...messages["error"], variant: "destructive" });
    toast({ ...messages["success"], variant: "default" });
    router.replace("/dashboard/rooms");
  };
  if (isLoading)
    return (
      <div className="h-full flex gap-2 flex-col items-center justify-center">
        <Loader className="animate-spin" />
        wait...
      </div>
    );
  return (
    <div>
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

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem
                  style={{
                    display: isPrivate ? "block" : "none",
                  }}
                >
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
          <DialogFooter className="flex mt-4 items-center">
            <Button
              type="submit"
              className=" flex gap-2"
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>Update</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
      <form onSubmit={handleOnSubmitDelete}>
        <Alert
          variant={"destructive"}
          className="my-6 md:flex max-md:text-center items-center justify-between"
        >
          <div>
            <AlertTitle> Action is Permanent</AlertTitle>
            <AlertDescription>
              Are you sure you want to delete this room? This action is
              irreversible, and once deleted, the room cannot be restored.
            </AlertDescription>
          </div>
          <SubmitButton
            type="submit"
            className="max-md:mx-auto max-md:block max-md:w-fit max-md:mt-2"
            variant={"destructive"}
          >
            Delete Room
          </SubmitButton>
        </Alert>
      </form>
    </div>
  );
};

export default RoomSettings;
