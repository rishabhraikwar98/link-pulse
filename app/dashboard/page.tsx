import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddLinkForm from "./AddLinkForm";
import LinkList from "./LinkList";
import CopyUrlButton from "./CopyUrlButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) redirect("/login");

  const userId = data.claims.sub;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("id", userId)
    .single();

  const { data: links } = await supabase
    .from("links")
    .select("id, title, url, is_active, sort_order")
    .eq("profile_id", profile?.id)
    .order("sort_order", { ascending: true });

  const profileUrl = `${process.env.APP_BASE_URL}/${profile?.username}`;

  return (
    <>
      <div className="flex items-center justify-between my-6">
        <h1 className="text-xl font-medium text-center">Your Links</h1>
        <div className="flex items-center gap-3">
          <a
            href={`/${profile?.username}`}
            target="_blank"
            className="text-sm text-muted-foreground hover:underline "
          >
            View profile ↗
          </a>
          <CopyUrlButton url={profileUrl} />
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <AddLinkForm />
        <LinkList links={links ?? []} />
      </div>
    </>
  );
}
