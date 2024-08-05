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
import { currentUser } from "@clerk/nextjs/server";
import { Badge, Lock, LockOpen, User } from "lucide-react";
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
                className="border-secondary flex flex-col cursor-pointer hover:-translate-y-2 duration-500 border p-4 rounded-md shadow-md"
                key={room.id}
              >
                <CardHeader>
                  <CardTitle>{room.title}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <span className="flex text-lg gap-2">
                    {room.members.length}
                    <User />
                  </span>

                  <span>
                    {room.isPrivate ? (
                      <Lock className="text-destructive" />
                    ) : (
                      <LockOpen className="text-green-600" />
                    )}
                  </span>
                </CardContent>
                <CardFooter className="mt-auto">
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
