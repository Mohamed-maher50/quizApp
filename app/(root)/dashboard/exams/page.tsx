import { getMyExamsRooms, getUser } from "@/actions";

import React, { Suspense } from "react";

import Loader from "@/components/loader/Loader";
import Wait from "@/lib/Wait";
import ExamsCards from "./_components/ExamCards";
import Pagination from "./_components/Pagination";

interface IMyRoomExamsProps {
  searchParams: { page?: string };
}
export const dynamic = "force-dynamic";
const MyRoomExams = async ({ searchParams: { page } }: IMyRoomExamsProps) => {
  const user = await getUser();
  const mongoDBUserId = user?.publicMetadata.mongoDBId as string;
  if (!mongoDBUserId) return null;
  const limit = 8;
  let pageNumber = +(page || 1) - 1;
  let skip = pageNumber * limit;
  const roomsExams = getMyExamsRooms({
    userId: mongoDBUserId,
    filter: {
      take: limit,
      skip,
    },
  });

  return (
    <section key={Math.random().toString()}>
      <div className="container mx-auto">
        <h1 className="my-10 mx-auto w-fit text-3xl font-bold">
          My Exams Rooms
        </h1>
        <div>
          <Suspense
            fallback={
              <div className="absolute inset-0  flex items-center justify-center">
                <Loader />
              </div>
            }
          >
            <Wait promise={roomsExams}>
              {(data) => {
                if (!data) return null;
                return <ExamsCards data={data.data} />;
              }}
            </Wait>
          </Suspense>
        </div>
        <div className="w-fit mt-10 mx-auto">
          <Wait promise={roomsExams}>
            {(data) => {
              return <Pagination total={data?.count} pageSize={limit} />;
            }}
          </Wait>
        </div>
      </div>
    </section>
  );
};

export default MyRoomExams;
