"use client";
import { useState, useEffect, useTransition } from "react";
import { ListChevronsUpDown } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { toggleLink, deleteLink, reorderLinks } from "./actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Link = {
  id: string;
  title: string;
  url: string;
  is_active: boolean;
  sort_order: number;
};

function SortableRow({ link }: { link: Link }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-3 py-3 border-b last:border-0"
    >
      <Button
        variant="ghost"
        size="icon"
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing touch-none p-1 text-muted-foreground hover:text-foreground"
        aria-label="Drag to reorder"
      >
        <ListChevronsUpDown aria-hidden="true" size={16} />
      </Button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{link.title}</p>
        <p className="text-xs text-muted-foreground truncate">{link.url}</p>
      </div>

      <Badge variant={link.is_active ? "default" : "secondary"}>
        {link.is_active ? "Active" : "Hidden"}
      </Badge>

      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() =>
          startTransition(() => toggleLink(link.id, !link.is_active))
        }
      >
        {link.is_active ? "Hide" : "Show"}
      </Button>

      <Button
        variant="outline"
        size="sm"
        disabled={isPending}
        onClick={() => setOpen(true)}
      >
        Delete
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete link</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to delete "{link.title}"? This action cannot
            be undone.
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => {
                setOpen(false);
                startTransition(() => deleteLink(link.id));
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function LinkList({ links: initialLinks }: { links: Link[] }) {
  const [links, setLinks] = useState<Link[]>([]);
  const [, startReorder] = useTransition();

  useEffect(() => {
    setLinks(initialLinks);
  }, [initialLinks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex);

    setLinks(reordered);
    startReorder(() => reorderLinks(reordered.map((l) => l.id)));
  }

  if (links.length === 0) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        No links yet — add your first one above.
      </p>
    );
  }

  return (
    <Card>
      <CardContent className="pt-4 pb-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={links.map((l) => l.id)}
            strategy={verticalListSortingStrategy}
          >
            {links.map((link) => (
              <SortableRow key={link.id} link={link} />
            ))}
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
