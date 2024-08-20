import { getMembersActions } from "@/actions";
import MemberCard from "@/components/dashboard/admin/rooms/MemberCard";
import NotFoundAlert from "@/components/NotFoundAlert";
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
    return <NotFoundAlert description="Not Found Any Students" Icon={Users} />;

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
