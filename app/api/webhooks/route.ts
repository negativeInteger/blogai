import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { type NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const eventType = evt.type;

    if (eventType === "user.created") {
      const supabase = createAdminClient();
      const { email_addresses, first_name, last_name, id } = evt.data;

      const { error } = await supabase.from("profiles").insert([
        {
          id: id,
          email: email_addresses[0]?.email_address || "",
          first_name: first_name || "",
          last_name: last_name || "",
        },
      ]);

      if (error) {
        console.error("Error inserting new profile:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
