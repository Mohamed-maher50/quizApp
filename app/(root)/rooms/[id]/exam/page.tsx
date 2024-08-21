import { getRoomById, getStudent, getUser } from "@/actions";
import QuestionsForm from "@/components/QuestionsForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const ExamPage = async ({ params: { id } }: { params: { id: string } }) => {
  const room = await getRoomById(
    {
      roomId: id,
    },
    {
      include: {
        Question: {
          include: {
            Answers: true,
          },
        },
      },
    }
  );

  if (!room) return null;
  const clerkUser = await getUser();
  if (!clerkUser) return null;
  const userId = clerkUser?.publicMetadata.mongoDBId as string;
  const isExistInRoom = await getStudent({
    roomId: id,
    userId: userId,
  });
  if (!isExistInRoom) redirect("/");
  if (isExistInRoom.isSubmitted)
    return (
      <div className="container mx-auto ">
        <Alert className="w-fit mx-auto mt-40 border-green-400">
          <div className="flex gap-3 items-center">
            <ClipboardCheck className="w-10 h-10 text-green-400" />
            <div>
              <AlertTitle className="">
                Successfully submitted before
              </AlertTitle>
              <AlertDescription>Your already submit before</AlertDescription>
            </div>
          </div>
          <Button
            asChild
            variant={"outline"}
            className="flex mt-2 gap-1 items-center w-fit mx-auto"
          >
            <Link href={"/"}>
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </Button>
        </Alert>
      </div>
    );

  return (
    <main>
      <div className="container max-w-2xl mx-auto">
        <div className="pt-10 flex flex-col gap-3 ">
          <h1 className="text-4xl text-secondary-foreground font-extrabold">
            {room?.title}
          </h1>
          <p className="max-w-2xl text-muted-foreground">{room?.description}</p>
          <div className="py-10">
            <QuestionsForm
              questions={room.Question}
              roomId={id}
              studentId={isExistInRoom.id}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ExamPage;
