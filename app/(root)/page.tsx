import CreateRoomDialogForm from "@/components/CreateRoomDialogForm";
import JoinToRoomDialog from "@/components/JoinToRoomDialog";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Interactive Quiz Platform",
  description:
    "Discover a fun and interactive quiz website where you can test your knowledge across various topics. Our platform offers a wide range of quizzes designed to challenge your skills and provide valuable learning experiences. Whether you're a trivia enthusiast or just looking to brush up on your knowledge, our quizzes are perfect for all ages. Join our community, take quizzes, and track your progress. Start quizzing today and see how much you really know!",
};
export default async function Home() {
  return (
    <main className="flex items-center h-full   justify-center">
      <div className="container mx-auto">
        <div className="flex  items-center justify-between">
          <div className="flex   flex-wrap space-y-4 flex-col gap-2 w-fit mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-primary">
              Best Online
              <span className="dark:text-white text-black">Education </span>
            </h1>
            <p className="text-base md:text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequuntur temporibus iusto veniam illum, vitae asperiores
              magnam natus optio voluptates! Ea quam porro ex consectetur
              aperiam reprehenderit repellendus ad eos est.
            </p>
            <div className="flex gap-3">
              {/* i make userId as string because this page protect via middleware if no user can't access this page */}
              <JoinToRoomDialog />
              <CreateRoomDialogForm />
            </div>
          </div>

          <Image
            src="/homeHero.svg"
            width={500}
            height={400}
            alt="heroImage"
            className="max-lg:hidden"
          />
        </div>
      </div>
    </main>
  );
}
