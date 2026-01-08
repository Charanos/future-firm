import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterConfig {
    key: string;
    label: string; // Placeholder for select or label for date
    type?: "select" | "date" | "text";
    options?: FilterOption[]; // Required if type is 'select'
    defaultValue?: string;
    className?: string;
}

interface SearchFilterBarProps {
    onSearch: (query: string) => void;
    searchPlaceholder?: string;
    filters?: FilterConfig[];
    onFilterChange?: (key: string, value: string) => void;
    actions?: React.ReactNode;
    className?: string;
}

export function SearchFilterBar({
    onSearch,
    searchPlaceholder = "Search...",
    filters = [],
    onFilterChange,
    actions,
    className,
}: SearchFilterBarProps) {
    return (
        <div
            className={cn(
                "flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between p-4 rounded-2xl bg-card border border-border/40 shadow-sm backdrop-blur-xl",
                className
            )}
        >
            {/* Search and Filters Area */}
            <div className="flex flex-1 flex-col md:flex-row gap-3 w-full md:w-auto items-center flex-wrap">
                {/* Search Input */}
                <div className="relative w-full md:w-64 lg:w-80 group shrink-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <Input
                        type="text"
                        placeholder={searchPlaceholder}
                        className="pl-10 h-10 w-full rounded-xl border-border/40 bg-background/50 focus:bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                {/* Filters */}
                {filters.length > 0 && (
                    <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
                        {filters.map((filter) => {
                            if (filter.type === "date") {
                                return (
                                    <div key={filter.key} className={cn("relative", filter.className)}>
                                        <Input
                                            type="date"
                                            defaultValue={filter.defaultValue}
                                            onChange={(e) => onFilterChange && onFilterChange(filter.key, e.target.value)}
                                            className="h-10 rounded-xl border-border/40 bg-background/50 focus:bg-background transition-all w-[160px]"
                                        />
                                    </div>
                                )
                            }

                            // Default to select
                            return (
                                <Select
                                    key={filter.key}
                                    defaultValue={filter.defaultValue}
                                    onValueChange={(value) =>
                                        onFilterChange && onFilterChange(filter.key, value)
                                    }
                                >
                                    <SelectTrigger className={cn("w-[140px] h-10 rounded-xl border-border/40 bg-background/50 hover:bg-background transition-all", filter.className)}>
                                        <SelectValue placeholder={filter.label} />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {filter.options?.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Actions Area */}
            {actions && (
                <div className="flex items-center gap-2 w-full xl:w-auto justify-end shrink-0">
                    {actions}
                </div>
            )}
        </div>
    );
}
