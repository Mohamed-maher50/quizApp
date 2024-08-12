import { getMyRooms } from "@/actions/Rooms";
import CreateRoomDialogForm from "@/components/CreateRoomDialogForm";
import Loader from "@/components/loader/Loader";

import RoomPagination from "@/components/RoomPagination";
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
import { currentUser } from "@clerk/nextjs/server";
import { BookOpenCheck, Lock, LockOpen, User } from "lucide-react";
import Link from "next/link";
import React from "react";
interface IMyRoomsPageProps {
  searchParams: { page?: string };
}
const myRooms = async ({ searchParams: { page = "1" } }: IMyRoomsPageProps) => {
  const user = await currentUser();
  let limit = 2;
  const skip = (+page - 1) * limit;
  const take = 2;
  const rooms = await getMyRooms(
    { userId: user?.id as string },
    {
      take,
      skip,
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

  const isLastPage = rooms.data.length < limit;
  return (
    <main>
      <div className="container mx-auto">
        <div className="flex justify-end py-10">
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
                  <CardTitle>{room.title}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col ">
                  <div className="flex justify-between">
                    <span className="flex items-center text-lg gap-2">
                      {room.members.length}
                      <User size={19} />
                    </span>

                    <span className="flex items-center">
                      {room.isPrivate ? (
                        <Lock size={19} className="text-destructive" />
                      ) : (
                        <LockOpen size={19} className="text-green-600" />
                      )}
                    </span>
                  </div>

                  <UpdateRoomDialogForm
                    defaultValues={{
                      description: room.description,
                      title: room.title,
                      isPrivate: room.isPrivate,
                      password: room.password,
                    }}
                    roomId={room.id}
                  />
                </CardContent>
                <CardFooter className="mt-auto w-full flex flex-col">
                  <Button asChild className="w-full " variant={"outline"}>
                    <Link href={`/rooms/${room.id}/insert`}>manage</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
          <RoomPagination
            active={+page || 1}
            count={rooms.count}
            limit={limit}
            isLastPage={isLastPage}
          />
        </div>
      </div>
    </main>
  );
};

export default myRooms;
