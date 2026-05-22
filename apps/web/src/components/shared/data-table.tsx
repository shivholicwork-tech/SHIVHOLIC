"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  className,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      const cmp = (aVal as string) < (bVal as string) ? -1 : 1;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  return (
    <div className={cn("rounded-lg border", className)}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 text-left font-medium text-muted-foreground">
                  {col.sortable ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="-ml-3 h-8 gap-1"
                      onClick={() => handleSort(col.key)}
                    >
                      {col.header}
                      <ArrowUpDown className="h-3 w-3" />
                    </Button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
