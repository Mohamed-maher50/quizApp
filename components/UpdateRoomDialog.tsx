"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Loader2, Settings } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { deleteRoom, updateRoomAction } from "@/actions/Rooms";
import SubmitButton from "@/app/SubmitButton";
import { useToast } from "./ui/use-toast";
const messages = {
  success: {
    title: "Room deleted successfully",
    description: "Your room has been deleted successfully.",
    variant: "default",
  },
  error: {
    title: "Failed to delete room",
    description: "An error occurred while delete your room.",
    variant: "destructive",
  },
};
const UpdateRoomDialogForm = ({
  defaultValues,
  roomId,
}: {
  defaultValues: Partial<createRoomSchemaTypes>;
  roomId: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const router = useRouter();
  const form = useForm<createRoomSchemaTypes>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: defaultValues,
  });

  const { isSubmitting, isLoading } = form.formState;
  const isPrivate = useWatch({
    control: form.control,
    name: "isPrivate",
    defaultValue: defaultValues.isPrivate,
  });
  const { toast } = useToast();

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form, form.formState.isSubmitSuccessful]);
  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      router.push("/sign-in");
    }
  }, [isSignedIn]);

  if (isLoading) return null;

  const handleOnSubmit = async (values: createRoomSchemaTypes) => {
    await updateRoomAction({
      ...values,
      userId: user?.id as string,
      roomId,
      password: isPrivate ? values.password : undefined,
    });
    setIsOpen(false);
  };
  const handleOnSubmitDelete = async () => {
    const result = await deleteRoom(roomId, user?.id as string);
    if (!result) return toast({ ...messages["error"], variant: "destructive" });
    toast({ ...messages["success"], variant: "default" });

    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex mt-2 items-center  justify-between text-sm">
        <span>Room Settings</span>
        <DialogTrigger asChild>
          <Settings
            size={17}
            className="paused hover:running animate-spin  cursor-pointer"
          />
        </DialogTrigger>
      </div>

      <DialogContent className="duration-500">
        <DialogHeader>
          <DialogTitle> Update Your Exam Room</DialogTitle>
          <DialogDescription>
            Follow the steps to Update and personalize your exam room.
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
              <SubmitButton
                variant={"ghost"}
                type="button"
                onClick={handleOnSubmitDelete}
              >
                Delete
              </SubmitButton>
              <Button
                type="submit"
                className=" flex gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span>Create</span>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>{" "}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoomDialogForm;
