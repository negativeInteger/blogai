import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server"; 

export async function POST(request: Request) {
 
    try {
        const { data } = await request.json();
        const supabase = createAdminClient();
        const { error } = await supabase.from("blogs").insert([
            { 
                ...data, 
                slug: data.title.split(" ").join("-").toLowerCase() + crypto.randomUUID() 
            },
        ]);

        if (error) {
            console.error("Error saving blog post:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ message: "Blog post saved successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error saving blog post:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
