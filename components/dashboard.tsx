"use client";

import { IconBox, IconShoppingCart, IconUsers, IconTrendingUp, IconPlus, IconArrowUpRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const stats = [
    { title: "Total Revenue", value: "¥128,430", change: "+12.5%", icon: IconTrendingUp },
    { title: "Active Orders", value: "43", change: "+3", icon: IconShoppingCart },
    { title: "Total Products", value: "156", change: "0", icon: IconBox },
    { title: "New Customers", value: "1,204", change: "+18", icon: IconUsers },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-950 uppercase">Dashboard</h1>
          <p className="text-sm text-zinc-500 mt-1">Welcome back, here&apos;s what&apos;s happening today.</p>
        </div>
        <Button className="rounded-none bg-zinc-950 px-6 uppercase tracking-widest text-[10px] hover:bg-zinc-800">
          <IconPlus className="mr-2 size-3" /> Add New Product
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white border border-zinc-200 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[10px] font-bold uppercase tracking-widest">{stat.title}</span>
              <stat.icon className="size-4" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-zinc-950">{stat.value}</span>
              <span className={`text-[10px] font-bold ${stat.change.startsWith("+") ? "text-emerald-600" : "text-zinc-400"}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders Table */}
        <div className="lg:col-span-2 bg-white border border-zinc-200">
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">Recent Orders</h3>
            <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-widest font-bold">View All</Button>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50/50 text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {[1, 2, 3, 4].map((i) => (
                  <tr key={i} className="border-t border-zinc-100 hover:bg-zinc-50/50 transition-colors">
                    <td className="p-4 font-medium text-zinc-950">#LX-00{i}24</td>
                    <td className="p-4 text-zinc-500">Customer Name</td>
                    <td className="p-4">
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">Paid</span>
                    </td>
                    <td className="p-4 text-right font-bold text-zinc-950">¥4,200</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stock Alert */}
        <div className="bg-white border border-zinc-200 flex flex-col">
          <div className="p-6 border-b border-zinc-100">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">Stock Alert</h3>
          </div>
          <div className="p-6 space-y-6 flex-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="size-12 bg-zinc-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase truncate">Silk Dress Item</p>
                  <p className="text-[10px] text-zinc-400 mt-1">2 Units left</p>
                </div>
                <IconArrowUpRight className="size-4 text-zinc-300" />
              </div>
            ))}
          </div>
          <div className="p-6 mt-auto">
            <Button variant="outline" className="w-full rounded-none uppercase tracking-widest text-[10px] font-bold">Manage Inventory</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
