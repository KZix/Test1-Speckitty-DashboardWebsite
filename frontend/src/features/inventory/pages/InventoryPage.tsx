import { useState, useMemo } from "react";
import { useInstruments } from "../api/useInstruments";
import { InventoryTable } from "../components/InventoryTable";
import { InstrumentForm } from "../components/InstrumentForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInstrument } from "../api/createInstrument";
import { updateInstrument } from "../api/updateInstrument";
import { deleteInstrument } from "../api/deleteInstrument";
import { useToast } from "@/hooks/use-toast";
import type { Instrument } from "../types";

export function InventoryPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingInstrument, setEditingInstrument] = useState<Instrument | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInstruments({
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const instruments = useMemo(() => {
    const allInstruments = data?.pages.flatMap((page) => page.data) || [];
    if (!search) return allInstruments;
    return allInstruments.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.serial_number.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  const createMutation = useMutation({
    mutationFn: (vars: { values: any; image: File | null }) =>
      createInstrument({ ...vars.values, image: vars.image }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instruments"] });
      setIsCreateOpen(false);
      toast({ title: "Success", description: "Instrument created successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create instrument.", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: string; values: any; image: File | null }) =>
      updateInstrument({ id: vars.id, ...vars.values, image: vars.image }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instruments"] });
      setEditingInstrument(null);
      toast({ title: "Success", description: "Instrument updated successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update instrument.", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInstrument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instruments"] });
      toast({ title: "Success", description: "Instrument deleted successfully." });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete instrument.", variant: "destructive" });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this instrument?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instrument Inventory</h1>
          <p className="text-muted-foreground">
            Manage and track all association musical instruments.
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Instrument
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or serial number..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <InventoryTable
          instruments={instruments}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          fetchNextPage={fetchNextPage}
          onEdit={setEditingInstrument}
          onDelete={handleDelete}
        />
      )}

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Instrument</DialogTitle>
          </DialogHeader>
          <InstrumentForm
            onSubmit={(values, image) => createMutation.mutate({ values, image })}
            isLoading={createMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingInstrument}
        onOpenChange={(open: boolean) => !open && setEditingInstrument(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Instrument</DialogTitle>
          </DialogHeader>
          {editingInstrument && (
            <InstrumentForm
              initialValues={editingInstrument}
              onSubmit={(values, image) =>
                updateMutation.mutate({ id: editingInstrument.id, values, image })
              }
              isLoading={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
