import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const accessToken = authHeader.split(" ")[1];

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser(accessToken);

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const uid = user.id;

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("id, profileImage")
    .eq("id", uid)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "User profile not found" }, { status: 404 });
  }

  // Step 2: Delete additional_links rows
  const { error: linksError } = await supabase
    .from("additional_links")
    .delete()
    .eq("user_id", uid);

  if (linksError) {
    return NextResponse.json({ error: linksError.message }, { status: 500 });
  }

  if (profile.profileImage) {
    const imagePathMatch = profile.profileImage.match(/profile-images\/(.+)(\?.*)?$/);
    const imagePath = imagePathMatch ? imagePathMatch[1] : null;

    if (imagePath) {
      const { error: imageDeleteError } = await supabase.storage
        .from("profile-images")
        .remove([imagePath]);

      if (imageDeleteError) {
        console.error("Failed to delete profile image:", imageDeleteError.message);
      }
    }
  }

  const { error: userDeleteError } = await supabase
    .from("users")
    .delete()
    .eq("id", uid);

  if (userDeleteError) {
    return NextResponse.json({ error: userDeleteError.message }, { status: 500 });
  }

  // Step 5: Delete user from Supabase Auth (requires service role key and admin client)
  try {
    await supabase.auth.admin.deleteUser(uid);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Failed to delete user from auth:", err.message);
    } else {
      console.error("Failed to delete user from auth:", err);
    }
    return NextResponse.json({ error: "Failed to delete user from auth" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}