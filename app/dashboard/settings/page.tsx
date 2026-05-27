import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "./ProfileForm";
import ThemeEditor from "./ThemeEditor";
import { DEFAULT_THEME, type Theme } from "@/lib/types/theme";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, bio, avatar_url, theme")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/onboarding");

  const currentTheme: Theme = {
    ...DEFAULT_THEME,
    ...((profile?.theme as Partial<Theme>) ?? {}),
  };

  return (
      <div className="space-y-12">
        <div>
          <h2 className="text-lg font-medium mb-6">Profile</h2>
          <ProfileForm profile={profile} />
        </div>
        <div>
          <h2 className="text-lg font-medium mb-6">Appearance</h2>
          <ThemeEditor initial={currentTheme} />
        </div>
      </div>
  );
}
