import { getMembersActions } from "@/actions/Rooms";
import MemberCard from "@/components/dashboard/admin/rooms/MemberCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Users } from "lucide-react";
import React from "react";

const MembersSection = async ({
  params: { id },
}: {
  params: { id?: string };
}) => {
  if (!id) return <>not found room</>;
  // Fetch room members
  const members = await getMembersActions(id);
  if (!members || members.length === 0)
    return (
      <div className="h-full flex items-center justify-center">
        <Alert className="flex items-start mx-auto gap-2 w-fit">
          <AlertTitle className="w-fit items-end  flex">
            <Users size={19} />
          </AlertTitle>
          <AlertDescription>No Members In This Room</AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div>
      {members?.map((member) => {
        return (
          <MemberCard
            {...member.user}
            key={member.id}
            id={member.id}
            roomId={id}
          />
        );
      })}
    </div>
  );
};

export default MembersSection;
