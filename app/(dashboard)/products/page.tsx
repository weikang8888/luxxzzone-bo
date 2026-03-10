"use client";

import * as React from "react";
import { IconPlus, IconSearch, IconFilter } from "@tabler/icons-react";
import { createColumnHelper } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/data-table";

// Example product type & mock data
type Product = {
  id: string;
  name: string;
  sku: string;
  price: string;
  status: string;
};

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("sku", {
    header: "SKU",
    cell: (info) => (
      <span className="text-muted-foreground font-mono text-xs">{info.getValue()}</span>
    ),
  }),
  columnHelper.accessor("price", {
    header: "Price",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => (
      <span className="rounded border border-border px-2 py-0.5 text-[10px] uppercase">
        {info.getValue()}
      </span>
    ),
  }),
];

const mockProducts: Product[] = [
  { id: "1", name: "Classic Tee", sku: "CT-001", price: "$29.00", status: "Active" },
  { id: "2", name: "Premium Hoodie", sku: "PH-002", price: "$79.00", status: "Active" },
  { id: "3", name: "Luxury Cap", sku: "LC-003", price: "$45.00", status: "Draft" },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase">Products</h1>
          <p className="text-sm text-zinc-500 mt-1">Manage your inventory and product storytelling.</p>
        </div>
        <Button className="rounded-none bg-zinc-950 px-6 uppercase tracking-widest text-[10px] font-bold hover:bg-zinc-800">
          <IconPlus className="mr-2 size-4" /> Add Product
        </Button>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 border border-zinc-200">
        <div className="relative flex-1 max-w-sm">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <Input
            placeholder="Search products..."
            className="pl-10 rounded-none border-zinc-200 focus-visible:ring-zinc-950 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-none text-[10px] uppercase tracking-widest font-bold border-zinc-200">
            <IconFilter className="mr-2 size-3" /> Filter
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={mockProducts} />
    </div>
  );
}
