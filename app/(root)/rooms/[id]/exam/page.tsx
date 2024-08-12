import { getQuestionsAction } from "@/actions/Questions.action";
import QuestionsForm from "@/components/QuestionsForm";
import { Card, CardHeader } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";

import React from "react";

const ExamPage = async ({ params: { id } }: { params: { id: string } }) => {
  const Questions = await getQuestionsAction({
    roomId: id,
  });
  if (!Questions || !Questions.length) return null;
  const user = await currentUser();

  if (!user) return null;

  return (
    <main>
      <div className="container max-w-2xl mx-auto">
        <div className="pt-10 flex flex-col gap-3 ">
          <h1 className="text-4xl text-secondary-foreground font-extrabold">
            {Questions[0].room?.title}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            {Questions[0].room?.description}
          </p>
          <div className="py-10">
            <QuestionsForm questions={Questions} roomId={id} userId={user.id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExamPage;
