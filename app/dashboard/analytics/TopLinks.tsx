"use client";

type Props = { data: { title: string; clicks: number }[] };

export default function TopLinks({ data }: Props) {
  if (data.length === 0) {
    return <p className="text-sm text-muted-foreground">No data yet.</p>;
  }

  const max = data[0].clicks;

  return (
    <div className="space-y-3">
      {data.map((link) => (
        <div key={link.title}>
          <div className="flex justify-between text-sm mb-1">
            <span className="truncate">{link.title}</span>
            <span className="text-muted-foreground ml-4 shrink-0">
              {link.clicks} click{link.clicks !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.round((link.clicks / max) * 100)}%`,
                background: "#6366f1",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
