"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const data = [
  { name: "Mon", active: 140, inactive: 40 },
  { name: "Tue", active: 160, inactive: 35 },
  { name: "Wed", active: 180, inactive: 30 },
  { name: "Thu", active: 190, inactive: 25 },
  { name: "Fri", active: 220, inactive: 20 },
  { name: "Sat", active: 250, inactive: 15 },
  { name: "Sun", active: 230, inactive: 20 },
];

export function ClientActivityChart() {
  return (
    <Card className="card-soft h-full min-h-[350px]">
      <CardHeader>
        <CardTitle>Client Activity</CardTitle>
        <CardDescription>
          Active vs Inactive sessions over the last week.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Tooltip
                cursor={{ fill: "hsl(var(--muted)/0.4)" }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis hide />
              <Bar
                dataKey="active"
                name="Active Users"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="inactive"
                name="Inactive Users"
                fill="hsl(var(--muted))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
