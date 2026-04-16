import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Instrument } from "../types";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Edit, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AssignmentAction } from "./AssignmentAction";

type InventoryTableProps = {
  instruments: Instrument[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  onEdit: (instrument: Instrument) => void;
  onDelete: (id: string) => void;
};

export function InventoryTable({
  instruments,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  onEdit,
  onDelete,
}: InventoryTableProps) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const getStatusBadge = (status: Instrument['status']) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>;
      case 'maintenance':
        return <Badge variant="destructive">Maintenance</Badge>;
      case 'assigned':
        return <Badge variant="secondary">Assigned</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Status</TableHead>
            {isAdmin && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {instruments.map((instrument) => (
            <TableRow key={instrument.id}>
              <TableCell>
                {instrument.image_url ? (
                  <img
                    src={instrument.image_url}
                    alt={instrument.name}
                    className="h-10 w-10 object-cover rounded"
                  />
                ) : (
                  <div className="h-10 w-10 bg-muted rounded flex items-center justify-center text-[10px] text-muted-foreground">
                    No image
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">{instrument.name}</TableCell>
              <TableCell>{instrument.type}</TableCell>
              <TableCell>{instrument.brand}</TableCell>
              <TableCell>{instrument.serial_number}</TableCell>
              <TableCell>{getStatusBadge(instrument.status)}</TableCell>
              {isAdmin && (
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <AssignmentAction instrument={instrument} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(instrument)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDelete(instrument.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
          {!isFetchingNextPage && hasNextPage && (
            <TableRow>
              <TableCell colSpan={isAdmin ? 7 : 6} className="h-24 text-center">
                <div ref={ref}>Scroll to load more</div>
              </TableCell>
            </TableRow>
          )}
          {isFetchingNextPage && (
            <TableRow>
              <TableCell colSpan={isAdmin ? 7 : 6} className="h-24 text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto" />
              </TableCell>
            </TableRow>
          )}
          {instruments.length === 0 && !isFetchingNextPage && (
            <TableRow>
              <TableCell colSpan={isAdmin ? 7 : 6} className="h-24 text-center">
                No instruments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
