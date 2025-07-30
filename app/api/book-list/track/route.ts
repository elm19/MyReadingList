import { getUser } from "@/app/(auth)/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const {action, listId} = await request.json();
  const { supabase, user } = await getUser();

  if (!user) {
    return NextResponse.json({ error: "no user", message: "you need to log in" });
  }
  if (action === "track") {
    const { error } = await supabase.from("list_followers").insert({
      user_id: user.id,
      list_id: listId,
    });
    if (error)
      return NextResponse.json({ success: false, error: error.message });
  } else if (action === "untrack") {
    const { error } = await supabase
      .from("list_followers")
      .delete()
      .match({ user_id: user.id, list_id: listId })
      
      ;

    if (error)
      return NextResponse.json({ success: false, error: error.message });
  }

  return NextResponse.json({ success: true });
}
