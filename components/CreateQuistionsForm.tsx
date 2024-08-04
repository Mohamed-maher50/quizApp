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
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader, Minus, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createQuestionAction } from "@/actions/SubmitNewQuestion";
const formSchema = z.object({
  question: z.string().min(5, {
    message: "Question must be at least 5 characters.",
  }),
  options: z
    .array(
      z.object({
        value: z
          .string()
          .min(1, "Option text is required")
          .max(100, "Option text cannot exceed 100 characters"),
      })
    )
    .min(2, { message: "You must provide at least 2 options." }),
  correctAnswer: z.string(),
});
export type FormValuesTypes = z.infer<typeof formSchema>;
const CreateRoomForm = ({ roomId }: { roomId: string }) => {
  const form = useForm<FormValuesTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      options: [
        {
          value: "",
        },
        {
          value: "",
        },
      ],
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });
  const options = useWatch({
    control: form.control,
    name: "options",
  });

  const onSubmit = async (data: FormValuesTypes) => {
    console.log("Form submitted:", data);
    setIsLoading(true);
    await createQuestionAction({
      ...data,
      roomId,
    });
    setIsLoading(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl mx-auto mt-2 border-secondary rounded-md border-2 p-3"
      >
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Input placeholder="describe Your Question" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((fieldForm, index) => (
          <FormField
            key={fieldForm.id}
            control={form.control}
            name={`options.${index}.value`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option {index + 1}</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Enter Option" {...field} />
                    <Button
                      size={"sm"}
                      onClick={() => remove(index)}
                      asChild
                      variant={"destructive"}
                      className="px-1 py-1 h-fit rounded-sm absolute cursor-pointer float-right right-3 top-1/2 -translate-y-1/2"
                    >
                      <Minus />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <div className=" flex justify-end">
          <Button
            size={"icon"}
            onClick={() =>
              append({
                value: "",
              })
            }
            type="button"
            className=""
            variant={"default"}
          >
            <Plus size={16} />
          </Button>
        </div>
        <FormField
          control={form.control}
          name="correctAnswer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((field, index) => {
                    if (field.value.length <= 0) return null;
                    return (
                      <SelectItem key={index} value={field.value}>
                        {field.value}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>select correct answer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.errors.options && (
          <p className="text-red-400">
            {form.formState.errors.options?.root?.message}
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader className="animate-spin" />}
          <span>Submit</span>
        </Button>
      </form>
    </Form>
  );
};

export default CreateRoomForm;
