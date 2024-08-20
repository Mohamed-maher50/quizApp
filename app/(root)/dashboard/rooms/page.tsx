import { getMyRooms, getUser } from "@/actions";

import CopyButton from "@/components/CopyButton";
import CreateRoomDialogForm from "@/components/CreateRoomDialogForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdateRoomDialogForm from "@/components/UpdateRoomDialog";

import { BookOpenCheck, Lock, LockOpen, ScanBarcode, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import Pagination from "./_components/Pagination";

interface IMyRoomsPageProps {
  searchParams: { page?: string };
}

const myRooms = async ({ searchParams: { page } }: IMyRoomsPageProps) => {
  const user = await getUser();
  const limit = 8;
  let pageNumber = +(page || 1) - 1;
  let skip = pageNumber * limit;

  const rooms = await getMyRooms(
    { userId: user?.publicMetadata.mongoDBId as string },
    {
      take: limit,
      skip,
      include: {
        Students: true,
      },
    }
  );

  if (!rooms || rooms.data.length <= 0)
    return (
      <>
        <div className="  gap-2 w-fit mx-auto  col-span-full grid  mt-40 ">
          <BookOpenCheck className="w-fit mx-auto" size={50} />
          <Alert>
            <AlertTitle>Your Rooms!</AlertTitle>
            <AlertDescription>
              You have no rooms yet. Create a new one by clicking the button
              below.
            </AlertDescription>
          </Alert>
          <CreateRoomDialogForm />
        </div>
      </>
    );

  return (
    <main>
      <div className="container mx-auto">
        <div className="flex justify-end py-3">
          <CreateRoomDialogForm />
        </div>

        <div className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
          {rooms.data?.map((room) => {
            return (
              <Card
                className="border-secondary flex flex-col  duration-500 border p-4 rounded-md shadow-md"
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
                  <div className="flex justify-between">
                    <span className="flex items-center text-lg gap-2">
                      <User size={19} /> {room.Students.length}
                    </span>

                    <span className="flex  mr-1 items-center">
                      {room.isPrivate ? (
                        <Lock size={19} className="text-destructive" />
                      ) : (
                        <LockOpen size={19} className="text-green-600" />
                      )}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto w-full flex flex-col">
                  <Button asChild className="w-full " variant={"outline"}>
                    <Link href={`/dashboard/rooms/${room.id}`}>manage</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        <div className="w-fit mx-auto my-7">
          <Pagination pageSize={limit} total={rooms.count} />
        </div>
      </div>
    </main>
  );
};

export default myRooms;
