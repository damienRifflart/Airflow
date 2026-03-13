"use client";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";
import type { PressureDataPoint } from "../../../types/charts";

interface ChartWidgetProps {
    data: PressureDataPoint[];
    title?: string;
}

export function PressureChart({ data, title }: ChartWidgetProps) {
    return (
        <div className="w-full">
            {title && <h3 className="text-xl mb-5 text-accent font-semibold tracking-wide">{title}</h3>}
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} barCategoryGap={0} barGap={0}>
                        <CartesianGrid strokeDasharray="3 3" stroke="background" />
                        <XAxis
                            dataKey="reportTime"
                            domain={["auto", "auto"]}
                            interval={Math.floor(data.length / 6)}
                            tickFormatter={(ts) => `${new Date(ts).getDate()}/${new Date(ts).getMonth() + 1}`}
                        />
                        <YAxis domain={['dataMin - 2', 'dataMax + 2']} />
                        <Area dataKey="pressure" fill="#9395D3" stroke="#9395D3" fillOpacity={0.3} name="Atmospheric pressure" />
                        <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload?.length) {
                            return (
                                <div className="bg-background border border-border p-2 rounded-md">
                                Pressure: {payload[0]?.value} hPa
                                </div>
                            );
                            }
                            return null;
                        }}
                        />
                        <Legend />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}