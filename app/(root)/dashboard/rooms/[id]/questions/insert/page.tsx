import CreateRoomForm from "@/components/QuestionForm";
import { notFound } from "next/navigation";
import React from "react";
interface IInsertQuestionsProps {
  params: { id: string };
}
const InsertQuestionsPage = ({ params: { id } }: IInsertQuestionsProps) => {
  if (!id) notFound();
  return (
    <main className="h-full ">
      <div className="container mx-auto">
        <CreateRoomForm roomId={id} />
      </div>
    </main>
  );
};

export default InsertQuestionsPage;
