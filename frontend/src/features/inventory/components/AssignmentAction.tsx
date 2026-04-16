import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInstrumentStatus } from "../api/updateInstrumentStatus";
import type { Instrument, InstrumentStatus } from "../types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Wrench, CheckCircle } from "lucide-react";

type AssignmentActionProps = {
  instrument: Instrument;
};

export function AssignmentAction({ instrument }: AssignmentActionProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (newStatus: InstrumentStatus) =>
      updateInstrumentStatus({ id: instrument.id, status: newStatus }),
    onMutate: async (newStatus) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["instruments"] });

      // Snapshot the previous value
      const previousInstruments = queryClient.getQueryData(["instruments"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["instruments"], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((i: Instrument) =>
              i.id === instrument.id ? { ...i, status: newStatus } : i
            ),
          })),
        };
      });

      return { previousInstruments };
    },
    onError: (_err, _newStatus, context) => {
      queryClient.setQueryData(["instruments"], context?.previousInstruments);
      toast({
        title: "Error",
        description: "Failed to update status.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["instruments"] });
    },
  });

  if (instrument.status === "available") {
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={() => mutation.mutate("maintenance")}
        disabled={mutation.isPending}
      >
        <Wrench className="mr-2 h-3.5 w-3.5" /> Maintenance
      </Button>
    );
  }

  if (instrument.status === "maintenance") {
    return (
      <Button
        variant="outline"
        size="sm"
        className="h-8"
        onClick={() => mutation.mutate("available")}
        disabled={mutation.isPending}
      >
        <CheckCircle className="mr-2 h-3.5 w-3.5" /> Set Available
      </Button>
    );
  }

  return null;
}
