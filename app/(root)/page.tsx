import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center h-screen  justify-center">
      <div className="container mx-auto">
        <div className="flex  items-center justify-between">
          <div className="flex  space-y-4 flex-col gap-2 w-fit mx-auto">
            <h1 className="text-6xl font-bold text-primary">
              Best Online{" "}
              <span className="dark:text-white text-black">Education </span>
            </h1>
            <p className="text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Consequuntur temporibus iusto veniam illum, vitae asperiores
              magnam natus optio voluptates! Ea quam porro ex consectetur
              aperiam reprehenderit repellendus ad eos est.
            </p>
            <div className="flex gap-3">
              <Button size={"lg"}>Join To Room</Button>
              <Button variant={"outline"} size={"lg"}>
                New Room
              </Button>
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
