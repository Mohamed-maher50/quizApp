import { NextResponse } from "next/server";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(request: Request) {
  try {
    // Parse the Clerk Webhook event
    const evt = (await request.json()) as WebhookEvent;

    const { id: clerkUserId } = evt.data;
    if (!clerkUserId)
      return NextResponse.json(
        { error: "No user ID provided" },
        { status: 400 }
      );

    // Create or delete a user in the database based on the Clerk Webhook event
    let user = null;
    switch (evt.type) {
      case "user.created": {
        user = await prisma.user.upsert({
          where: {
            clerkUserId,
          },
          create: {
            avatar: evt.data.image_url,
            username: `${evt.data.first_name} ${evt.data.last_name}`,
            email: evt.data.email_addresses[0].email_address,
            clerkUserId: evt.data.id,
          },
          update: {
            avatar: evt.data.image_url,
            username: `${evt.data.first_name} ${evt.data.last_name}`,
            email: evt.data.email_addresses[0].email_address,
            clerkUserId: evt.data.id,
          },
        });

        await clerkClient().users.updateUserMetadata(clerkUserId, {
          publicMetadata: {
            mongoDBId: user.id, // Assuming `user.id` is the MongoDB ObjectId
          },
        });
        break;
      }

      case "user.deleted": {
        user = await prisma.user.delete({
          where: {
            clerkUserId,
          },
        });
        break;
      }
      default:
        break;
    }
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
