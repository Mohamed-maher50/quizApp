import { getMyRooms } from "@/actions/Rooms";
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
import { Lock, LockOpen, User } from "lucide-react";
import React from "react";

const myRooms = async () => {
  const user = await currentUser();
  const rooms = await getMyRooms({ userId: user?.id as string });

  return (
    <main>
      <div className="container mx-auto">
        <div className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-3 ">
          {rooms?.map((room) => {
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
                  <Button className="w-full " variant={"outline"}>
                    View room
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default myRooms;
