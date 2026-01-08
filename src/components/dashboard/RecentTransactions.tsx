import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "TRX-9871",
    user: "John Doe",
    package: "Kowoleh 10Mbps",
    amount: "Ksh 1,500",
    status: "Success",
    date: "Today, 10:42 AM",
  },
  {
    id: "TRX-9872",
    user: "Jane Smith",
    package: "Business 50Mbps",
    amount: "Ksh 5,000",
    status: "Pending",
    date: "Today, 10:30 AM",
  },
  {
    id: "TRX-9873",
    user: "Robert Johnson",
    package: "Home 20Mbps",
    amount: "Ksh 2,500",
    status: "Failed",
    date: "Today, 10:15 AM",
  },
  {
    id: "TRX-9874",
    user: "Emily Davis",
    package: "Kowoleh 10Mbps",
    amount: "Ksh 1,500",
    status: "Success",
    date: "Today, 09:55 AM",
  },
];

export function RecentTransactions() {
  return (
    <Card className="card-soft">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((trx) => (
              <TableRow key={trx.id}>
                <TableCell className="font-medium">{trx.id}</TableCell>
                <TableCell>{trx.user}</TableCell>
                <TableCell className="text-muted-foreground">
                  {trx.package}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      trx.status === "Success"
                        ? "default" // Map default to primary (usually green/blue depending on theme) or use custom class
                        : trx.status === "Failed"
                        ? "destructive"
                        : "secondary"
                    }
                    className={
                      trx.status === "Success"
                        ? "bg-green-500/15 text-green-600 hover:bg-green-500/25 shadow-none"
                        : trx.status === "Pending"
                        ? "bg-orange-500/15 text-orange-600 hover:bg-orange-500/25 shadow-none"
                        : ""
                    }
                  >
                    {trx.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{trx.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
