import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    description?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
    iconClassName?: string;
}

export function StatsCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    className,
    iconClassName,
}: StatsCardProps) {
    return (
        <Card
            className={cn(
                "rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden relative",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                            {title}
                        </p>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>
                            {trend && (
                                <span
                                    className={cn(
                                        "text-xs font-medium px-1.5 py-0.5 rounded-full",
                                        trend.isPositive
                                            ? "text-emerald-500 bg-emerald-500/10"
                                            : "text-rose-500 bg-rose-500/10"
                                    )}
                                >
                                    {trend.isPositive ? "+" : ""}
                                    {trend.value}%
                                </span>
                            )}
                        </div>
                        {description && (
                            <p className="text-xs text-muted-foreground/80">{description}</p>
                        )}
                    </div>
                    <div
                        className={cn(
                            "h-12 w-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110",
                            iconClassName
                        )}
                    >
                        <Icon className="h-6 w-6" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
