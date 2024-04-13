import ProjectNav from "@/components/ProjectNav";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useTypeDispatch, useTypeSelector } from "@/hooks/useReduxHooks";
import { toggle } from "@/store/reducers/testSlice";
import { useState } from "react";

const TestPage = () => {
  const handler = () => {
    console.log("Click");
  };
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];
  return (
    <div className="border border-primary m-10 p-4">
      <div className="h-20 w-1/2 border-green-500 border-2">
        <div className="w-full  my-4">
          <ul className="flex gap-2 w-full border border-grey-900">
            <li className="flex-none h-10 w-10 bg-sky-700"></li>
            <li className="flex-none h-10 w-10 bg-sky-700"></li>
            <li className="flex-none h-10 w-10 bg-sky-700"></li>
            <li className="flex-[1 0 100%] h-10 w-full bg-red-700"></li>
          </ul>
        </div>
      </div>
      <br />
      <Button onClick={handler}>Click</Button>
      <br />
      <br />
      <br />
      <Table>
        <TableHeader>
          <TableRow className="divide-x divide-slate-950">
            <TableHead className=" w-28">Invoice</TableHead>
            <TableHead className="w-32 ">Status</TableHead>
            <TableHead className=" w-36">Method</TableHead>
            <TableHead className="w-36">Amount</TableHead>
            <TableHead className="text-center">empty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow
              key={invoice.invoice}
              className="divide-x divide-slate-950"
            >
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell className="text-right">
                {invoice.totalAmount}
              </TableCell>
              <TableCell>emp</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default TestPage;
