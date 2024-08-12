import CreateRoomDialogForm from "@/components/CreateRoomDialogForm";
import JoinToRoomDialog from "@/components/JoinToRoomDialog";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="flex items-center h-full pt-14  justify-center">
      <div className="container mx-auto">
        <div className="flex  items-center justify-between">
          <div className="flex  space-y-4 flex-col gap-2 w-fit mx-auto">
            <h1 className="text-6xl font-bold text-primary">
              Best Online
              <span className="dark:text-white text-black">Education </span>
            </h1>
            <p className="text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequuntur temporibus iusto veniam illum, vitae asperiores
              magnam natus optio voluptates! Ea quam porro ex consectetur
              aperiam reprehenderit repellendus ad eos est.
            </p>
            <div className="flex gap-3">
              {/* i make userId as string because this page protect via middleware if no user can't access this page */}
              <JoinToRoomDialog userId={user?.id as string} />

              <CreateRoomDialogForm />
            </div>
          </div>

          <Image
            src="/homeHero.svg"
            width={500}
            height={400}
            alt="heroImage"
            className="max-md:hidden"
          />
        </div>
      </div>
    </main>
  );
}
