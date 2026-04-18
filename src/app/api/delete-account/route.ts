import { NextResponse } from "next/server";
import { requireUser } from "@/src/domain/auth/requireUser";
import { createAdminClient } from "@/utils/supabase/server";
import { deleteAllServices } from "@/src/dal/services/deleteService";
import { deleteAllTestimonials } from "@/src/dal/testimonials/deleteTestimonial";

export async function POST() {
  const { user } = await requireUser()
  const admin = createAdminClient()
  const uid = user.id;

  const { data: profile, error: profileError } = await admin
    .from("users")
    .select("id, profileImage")
    .eq("id", uid)
    .single();

  if (profileError || !profile) {
    return NextResponse.json({ error: "User profile not found" }, { status: 404 });
  }

  // Step 2: Delete additional_links rows
  const { error: linksError } = await admin
    .from("additional_links")
    .delete()
    .eq("user_id", uid);

  if (linksError) {
    return NextResponse.json({ error: linksError.message }, { status: 500 });
  }

  await deleteAllServices(uid)
  await deleteAllTestimonials(uid)

  if (profile.profileImage) {
    const imagePathMatch = profile.profileImage.match(/profile-images\/(.+)(\?.*)?$/);
    const imagePath = imagePathMatch ? imagePathMatch[1] : null;

    if (imagePath) {
      const { error: imageDeleteError } = await admin.storage
        .from("profile-images")
        .remove([imagePath]);

      if (imageDeleteError) {
        console.error("Failed to delete profile image:", imageDeleteError.message);
      }
    }
  }

  const { error: userDeleteError } = await admin
    .from("users")
    .delete()
    .eq("id", uid);

  if (userDeleteError) {
    return NextResponse.json({ error: userDeleteError.message }, { status: 500 });
  }

  // Step 5: Delete user from Supabase Auth (requires service role key and admin client)
  try {
    await admin.auth.admin.deleteUser(uid);
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