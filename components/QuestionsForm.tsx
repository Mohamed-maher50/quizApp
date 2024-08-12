"use client";
import { Question } from "@prisma/client";
import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { answersSchema } from "@/services/validation/QuestionsValidator";
import { answersSchemaTypes } from "@/interfaces/interfaces.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";
import SubmitButton from "@/app/SubmitButton";
import { submitUserAnswerAction } from "@/actions/Answers.actions";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
type Option = {
  value: string;
};
const QuestionsForm = ({
  questions,
  roomId,
  userId,
}: {
  questions: Question[];
  roomId: string;
  userId: string;
}) => {
  const { toast } = useToast();
  const { replace } = useRouter();
  const form = useForm<answersSchemaTypes>({
    resolver: zodResolver(answersSchema),
    defaultValues: {
      roomId: roomId,
      answers: questions.map((q) => ({ questionId: q.id, answer: undefined })),
    },
  });
  const handleSubmit = async (data: answersSchemaTypes) => {
    await submitUserAnswerAction({
      answers: data.answers,
      userId,
      roomId: roomId,
    });
    form.reset();
    toast({
      title: "answers Submitted",
      description: "Your answers have been submitted successfully.",
      variant: "default",
    });
    replace("/");
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
          {questions.map(({ id, question, options }, index) => {
            return (
              <Fragment key={id}>
                <FormField
                  control={form.control}
                  key={id}
                  name={`answers.${index}.answer`}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xl">{question}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {options.map((option, index) => {
                            return (
                              <FormItem
                                key={index}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem
                                    value={(option as Option).value}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {(option as Option).value}
                                </FormLabel>
                              </FormItem>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`answers.${index}.questionId`}
                  render={({ field }) => {
                    return (
                      <FormItem className="hidden">
                        <FormLabel>questionId</FormLabel>
                        <FormControl>
                          <Input {...field} value={id} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </Fragment>
            );
          })}
          <SubmitButton
            className="w-fit"
            isLoading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting}
          >
            Submit
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default QuestionsForm;
