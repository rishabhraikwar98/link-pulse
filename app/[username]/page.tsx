import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileLinks from "./ProfileLinks";
import type { Metadata } from "next";
import Image from "next/image";
import { DEFAULT_THEME, type Theme } from "@/lib/types/theme";

type Props = { params: Promise<{ username: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, bio')
    .eq('username', username)
    .single()

  if (!profile) return { title: 'Profile not found' }

  return {
    title: profile.display_name ?? username,
    description: profile.bio ?? `Check out ${username}'s links on LinkPulse`,
    openGraph: {
      title: profile.display_name ?? username,
      description: profile.bio ?? `Check out ${username}'s links on LinkPulse`,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/${username}`,
      type: 'profile',
    },
  }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, avatar_url, theme")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: links } = await supabase
    .from("links")
    .select("id, title, url")
    .eq("profile_id", profile.id)
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const theme: Theme = {
    ...DEFAULT_THEME,
    ...((profile.theme as Partial<Theme>) ?? {}),
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center py-16 px-4"
      style={{ background: theme.bg }}
    >
      <div className={`w-full max-w-md space-y-8 ${theme.fontFamily}`}>
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 text-center">
          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt={profile.display_name ?? username}
              width={200}
              height={200}
              loading="eager"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center text-2xl font-medium"
              style={{ background: theme.buttonBg, color: theme.buttonText }}
            >
              {(profile.display_name ?? username).charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1
              className="text-xl font-medium"
              style={{ color: theme.buttonBg }}
            >
              {profile.display_name ?? username}
            </h1>
            {profile.bio && (
              <p className="text-sm mt-1" style={{ color: theme.buttonBg, opacity: 0.7 }}>
                {profile.bio}
              </p>
            )}
          </div>
        </div>

        {/* Links */}
        <ProfileLinks links={links ?? []} theme={theme} />
      </div>
    </main>
  );
}
