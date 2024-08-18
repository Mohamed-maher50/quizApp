"use client";
import React, { memo, useState } from "react";
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
import {
  createQuestionAction,
  getQuestionsAnswers,
  updateAnswersAction,
  updateQuestionAction,
} from "@/actions";
import { Questions } from "@prisma/client";
const formSchema = z.object({
  text: z.string().min(5, {
    message: "Question must be at least 5 characters.",
  }),
  answers: z
    .array(
      z.object({
        id: z.string().optional(),
        text: z
          .string()
          .min(1, "Option text is required")
          .max(100, "Option text cannot exceed 100 characters"),
        isCorrect: z.boolean().default(false).optional(),
      })
    )
    .min(2, { message: "You must provide at least 2 options." }),
});
export type FormValuesTypes = z.infer<typeof formSchema>;

const QuestionForm = ({
  roomId,
  question,
  formStatus = "submitting",
}: {
  roomId: string;
  question: Questions;
  defaultValues?: Partial<FormValuesTypes>;
  formStatus?: "updating" | "submitting";
}) => {
  const form = useForm<FormValuesTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      if (formStatus == "updating") {
        const answers = await getQuestionsAnswers({
          questionId: question.id,
        });
        console.log(answers);
        if (!answers)
          return {
            text: "",
            answers: [
              {
                text: "",
                isCorrect: true,
              },
            ],
          };
        return {
          text: question.text,
          answers,
        };
      }

      return {
        text: "",
        answers: [
          {
            text: "",
            isCorrect: true,
          },
        ],
      };
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });
  const options = useWatch({
    control: form.control,
    name: "answers",
  });

  const onSubmit = async (data: FormValuesTypes) => {
    if (formStatus === "submitting") {
      await createQuestionAction({
        ...data,
        roomId,
      });
    }
    if (formStatus === "updating") {
      if (form.formState.dirtyFields.text) {
        await updateQuestionAction({
          questionId: question.id,
          data: {
            text: data.text,
          },
        });
      }
      if (form.formState.dirtyFields.answers) {
        await updateAnswersAction({
          answers: data.answers,
        });

        console.log(form.formState.dirtyFields.answers);
      }
      // await updateAnswers
      console.log(data);
    }
    // form.reset();
  };
  const handleSelectChange = (selectedValue: string) => {
    const updatedAnswers = options?.map((answer) => ({
      ...answer,
      isCorrect: answer.text === selectedValue,
    }));

    if (formStatus == "updating") {
      // form.setValue()
    }

    form.setValue("answers", updatedAnswers, {
      shouldDirty: true,
    });
  };
  if (form.formState.isLoading) return <div>Loading...</div>;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8   mt-2 border-secondary rounded-md border-2 p-3"
      >
        <FormField
          control={form.control}
          name="text"
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

        {fields.map((fieldForm, index, arrayOfFields) => (
          <div key={fieldForm.id} className="relative">
            <FormField
              control={form.control}
              name={`answers.${index}.text`}
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
            {arrayOfFields.length - 1 == index && (
              <div className=" absolute -bottom-8 right-2  flex justify-end">
                <Button
                  size={"sm"}
                  onClick={() =>
                    append({
                      text: "",
                    })
                  }
                  type="button"
                  className="py-1 h-fit px-1"
                  variant={"default"}
                >
                  <Plus size={16} />
                </Button>
              </div>
            )}
          </div>
        ))}

        <FormField
          control={form.control}
          name="answers"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <Select
                  onValueChange={handleSelectChange}
                  defaultValue={field.value?.find((a) => a.isCorrect)?.text}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options?.map((field, index) => {
                      if (field.text.length <= 0) return null;
                      return (
                        <SelectItem key={index} value={field.text}>
                          {field.text}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormDescription>select correct answer</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {form.formState.errors.answers && (
          <p className="text-red-400">
            {form.formState.errors.answers?.root?.message}
          </p>
        )}

        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting && <Loader className="animate-spin" />}
          <span>{formStatus === "submitting" ? "Submit" : "Update"}</span>
        </Button>
      </form>
    </Form>
  );
};

export default memo(QuestionForm);
