"use client";
import { Answers, Questions } from "@prisma/client";
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
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { submitUserAnswerAction } from "@/actions";

interface PopulateQuestions extends Questions {
  Answers: Omit<Answers, "isCorrect">[];
}
const QuestionsForm = ({
  questions,
  roomId,
  studentId,
}: {
  questions: PopulateQuestions[];
  roomId: string;
  studentId: string;
}) => {
  const { toast } = useToast();
  const { replace } = useRouter();
  const form = useForm<answersSchemaTypes>({
    resolver: zodResolver(answersSchema),
    defaultValues: {
      roomId: roomId,
      answers: questions.map((q) => ({
        questionId: q.id,
        studentId,
        answerId: "",
      })),
    },
  });

  const handleSubmit = async (data: answersSchemaTypes) => {
    console.log(data);
    await submitUserAnswerAction({
      studentId,
      roomId: roomId,
      answers: data.answers,
    });
    form.reset();
    toast({
      title: "answers Submitted",
      description: "Your answers have been submitted successfully.",
      variant: "default",
    });
    replace("/");
  };
  console.log(form.formState.errors);
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-3"
        >
          {questions.map(({ id, Answers, text }, index) => {
            return (
              <Fragment key={id}>
                <FormField
                  control={form.control}
                  key={id}
                  name={`answers.${index}.answerId`}
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-xl">{text}</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {Answers.map((option, index) => {
                            return (
                              <FormItem
                                key={index}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={option.id} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {option.text}
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
