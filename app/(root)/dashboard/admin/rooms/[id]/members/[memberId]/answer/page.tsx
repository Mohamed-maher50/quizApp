import { getStudentAnswers } from "@/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import React from "react";
interface IMemberAnswerSectionProps {
  params: {
    id: string;
    memberId: string;
  };
  searchParams: {};
}
const MemberAnswerSection = async ({
  params: { id, memberId },
}: IMemberAnswerSectionProps) => {
  const data = await getStudentAnswers(
    {
      roomId: id,
      userId: memberId,
    },
    {}
  );

  if (!data) return null;
  console.log(data);
  return (
    <div className="flex flex-col gap-4">
      <Alert className="justify-between items-center flex">
        <div className="flex gap-2  items-center">
          <Image
            src={data.student.user.avatar || ""}
            className="rounded-full"
            alt={data.student.user.username}
            width={60}
            height={60}
          />
          <div className="flex flex-col">
            <AlertTitle>{data.student.user.username}</AlertTitle>
            <AlertDescription>{data.student.user.email}</AlertDescription>
          </div>
        </div>{" "}
        <div className="flex flex-col gap-1 ">
          <AlertTitle>{data.room.title}</AlertTitle>{" "}
          <AlertDescription>{data.room.description}</AlertDescription>
          <Badge className=" w-fit  " variant={"secondary"}>
            # {data.room.code}
          </Badge>
        </div>
      </Alert>
      <div className="border-secondary rounded-md p-4 border">
        <Alert className="text-center">
          <AlertTitle className="font-bold tracking-wide">
            Student&apos;s Answers
          </AlertTitle>
        </Alert>
        <Table className="flex flex-col gap-4 p-4">
          <TableHeader>
            <TableRow className="w-full justify-between flex  items-center h-full">
              <TableHead className="mt-2">question</TableHead>
              <TableHead className="mt-2">answer</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.userAnswerDetails.map((q, index) => {
              return (
                <TableRow
                  key={q.id}
                  className=" items-center flex  gap-2 justify-between"
                >
                  <TableCell className="flex items-center justify-between">
                    <span>
                      {index + 1} {")"} -{" "}
                    </span>
                    <span>{q.question.text}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={q.answer?.isCorrect ? null : "destructive"}
                      className={
                        q.answer?.isCorrect ? "border bg-green-500" : ""
                      }
                    >
                      {q.answer?.text}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}{" "}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MemberAnswerSection;
