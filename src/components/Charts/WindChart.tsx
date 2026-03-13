"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { Units } from "../../../types/units";
import type { WindDataPoint } from "../../../types/charts";

interface ChartWidgetProps {
  data: WindDataPoint[];
  title?: string;
  units: Units;
}

export function WindChart({ data, title, units }: ChartWidgetProps) {
    return (
        <div className="w-full">
            {title && <h3 className="text-xl mb-5 text-accent font-semibold tracking-wide">{title}</h3>}
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barCategoryGap={0} barGap={0}>
                        <CartesianGrid strokeDasharray="3 3" stroke="background" />
                        <XAxis
                            dataKey="reportTime"
                            domain={["auto", "auto"]}
                            interval={Math.floor(data.length / 6)}
                            tickFormatter={(ts) => `${new Date(ts).getDate()}/${new Date(ts).getMonth() + 1}`}
                        />
                        <YAxis />
                        <Bar dataKey="windspeed" fill="#8160fa" name="Wind Speed" />
                        <Bar dataKey="gusts" fill="#98c5fb" name="Gusts" />
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload?.length) {
                                return (
                                    <div className="bg-background border border-border p-2 rounded-md">
                                    Wind Speed: {payload[0]?.value} {units.speed}
                                    <br />
                                    Gusts: {payload[1]?.value} {units.speed}
                                    </div>
                                );
                                }
                                return null;
                            }}
                        />
                        <Legend />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}