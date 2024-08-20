import { getQuestionsAction, getRoomById } from "@/actions";
import NotFoundAlert from "@/components/NotFoundAlert";
import QuestionForm from "@/components/QuestionForm";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface IQuestionsSectionsProps {
  params: {
    id: string;
  };
}
const QuestionsSections = async ({
  params: { id },
}: IQuestionsSectionsProps) => {
  const questions = await getQuestionsAction({ roomId: id });

  if (questions?.length == 0)
    return (
      <NotFoundAlert
        description="Not Found any Question"
        className="flex-col gap-2"
      >
        <Button asChild variant={"outline"} size={"sm"}>
          <Link href={`/dashboard/rooms/${id}/questions/insert`}>
            New Question
          </Link>
        </Button>
      </NotFoundAlert>
    );

  return (
    <div className="flex flex-col  gap-10">
      {questions?.map((question) => {
        return (
          <Accordion
            type="single"
            className="w-full"
            collapsible
            key={question.id}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger> {question.text}</AccordionTrigger>
              <AccordionContent>
                <QuestionForm
                  roomId={id}
                  question={question}
                  formStatus="updating"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
};

export default QuestionsSections;
