import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../../ui/table";
import { Button } from "../../../../../ui/button";
import { PencilIcon, TrashIcon } from 'lucide-react';

export function Contents({ data, columns, onEdit, onDelete }) {
  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            {columns.map((column, index) => (
              <TableHead key={index} className="font-semibold">
                {column}
              </TableHead>
            ))}
            {(onEdit || onDelete) && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{row[column]}</TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell className="text-right">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(row.id)}
                      className="h-8 w-8 p-0"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(row.id)}
                      className="h-8 w-8 p-0"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
