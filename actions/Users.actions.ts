import { clerkClient, currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";
export const getUser = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) return null;

  // Check if the MongoDB ID is already stored in Clerk's public metadata
  let mongoDBId = clerkUser.publicMetadata.mongoDBId;

  if (!mongoDBId) {
    // If not, find or create the user in MongoDB via Prisma
    let user = await prisma.user.findUnique({
      where: { clerkUserId: clerkUser.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: clerkUser.emailAddresses[0].emailAddress,
          username:
            clerkUser.username || clerkUser.emailAddresses[0].emailAddress,
          clerkUserId: clerkUser.id,
        },
      });
    }

    // Store the MongoDB ID in Clerk's public metadata
    await clerkClient.users.updateUserMetadata(clerkUser.id, {
      publicMetadata: {
        mongoDBId: user.id,
      },
    });

    mongoDBId = user.id;
  }

  return clerkUser;
};
