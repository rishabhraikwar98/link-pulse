"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Link2,ChartColumn,UserCog,QrCode } from "lucide-react"; 
const links = [
  { href: "/dashboard", label: "Links", icon: Link2 },
  { href: "/dashboard/analytics", label: "Analytics", icon: ChartColumn },
  { href: "/dashboard/settings", label: "Settings", icon: UserCog },
  { href: "/dashboard/qr", label: "QR", icon: QrCode },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center mb-8">
      <div className="flex justify-between bg-secondary p-1 rounded-lg w-full md:w-fit">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`
              flex items-center gap-1 md:gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${
                isActive
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
              }
            `}
            >
              <Icon size={14}/>
              {label}
            </Link>
          );
        })}
      </div>
      <Button onClick={handleLogout} variant="secondary" size="default" className="cursor-pointer text-sm">
        Logout
      </Button>
    </nav>
  );
}
