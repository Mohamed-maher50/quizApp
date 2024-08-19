import React from "react";
import CopyButton from "@/components/CopyButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ScanBarcode } from "lucide-react";
interface IExamCardsProps {
  id: string;
  userId: string;
  roomId: string;
  isSubmitted: boolean | null;
  room: {
    id: string;
    creator: string;
    title: string;
    description: string | null;
    password: string | null;
    isPrivate: boolean;
    code: string;
  };
}
const ExamsCards = async ({ data }: { data: IExamCardsProps[] }) => {
  return (
    <section className="grid  grid-cols-4  gap-3" key={Math.random()}>
      {data?.map(({ room, isSubmitted }) => {
        return (
          <Card
            className={cn(
              "border-secondary columns-2 w-fit flex border flex-col  duration-500  p-4 rounded-md shadow-md",
              isSubmitted ? "border-green-500 " : "border-red-500"
            )}
            key={room.id}
          >
            <CardHeader>
              <CardTitle className="capitalize">{room.title}</CardTitle>
              <CardDescription className="capitalize">
                {room.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex justify-between">
                <span className="flex items-center text-lg gap-2">
                  <ScanBarcode size={19} />
                  <span className="text-sm">#{room.code}</span>
                </span>

                <CopyButton text={room.code} />
              </div>
            </CardContent>
            <CardFooter className="mt-auto w-full flex flex-col">
              <Button
                disabled={isSubmitted as boolean}
                className="w-full  capitalize"
                variant={"outline"}
              >
                {!isSubmitted ? (
                  <Link href={`/dashboard/student/rooms/${room.id}/exam`}>
                    Start Exam
                  </Link>
                ) : (
                  "submitted  "
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};

export default ExamsCards;
