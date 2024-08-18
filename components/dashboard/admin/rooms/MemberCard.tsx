import DeleteMemberBtn from "@/components/DeleteMemberBtn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@prisma/client";
import { Eye, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";
interface IMemberCardProps extends PropsWithChildren, User {
  roomId: string;
}
const MemberCard: FC<IMemberCardProps> = ({
  avatar,
  email,
  username,
  id,
  roomId,
}) => {
  return (
    <Card className="w-fit relative">
      <CardContent className="flex items-center w-full">
        <CardHeader>
          <Image
            src={avatar || ""}
            width={45}
            height={45}
            className="rounded-full object-contain shadow-md"
            alt={username}
          />
        </CardHeader>
        <div className="flex flex-col">
          <CardTitle>{username}</CardTitle>
          <CardDescription>{email}</CardDescription>
        </div>
        <CardFooter className="flex flex-col ml-3 gap-1  items-center p-0 justify-center ">
          <DeleteMemberBtn id={id} />
          <Button
            variant={"ghost"}
            asChild
            className="text-green-700 hover:text-green-400 p-1 h-fit px-2 top-3 right-3"
          >
            <Link
              href={`/dashboard/admin/rooms/${roomId}/members/${id}/answer`}
            >
              <EyeIcon size={16} />
            </Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
