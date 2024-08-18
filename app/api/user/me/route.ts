import prisma from "@/actions/prisma";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function GET() {
  console.log("getting");
  try {
    const clerkUser = await currentUser();

    const clerkUserMetadata = clerkUser?.publicMetadata.mongoDBId;
    if (!clerkUserMetadata && clerkUser) {
      const user = await prisma.user.findUnique({
        where: { id: clerkUser.id },
      });

      if (!user) return null;
      await clerkClient().users.updateUserMetadata(clerkUser.id, {
        publicMetadata: {
          mongoDBId: user.id,
        },
      });
    }
    return Response.json(clerkUser, {
      status: 200,
    });
  } catch (error) {
    return Response.json("error GET User ", {
      status: 500,
    });
  }
}
