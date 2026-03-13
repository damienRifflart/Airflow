"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { Units } from "../../../types/units";
import type { TempDataPoint } from '../../../types/charts';

interface ChartWidgetProps {
    data: TempDataPoint[];
    title?: string;
    units: Units;

}

export function TempChart({ data, title, units }: ChartWidgetProps) {
    return (
        <div className="w-full">
            {title && <h3 className="text-xl mb-5 text-accent font-semibold tracking-wide">{title}</h3>}
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="background" />
                        <XAxis dataKey="reportTime" scale="time" type="number" domain={["auto", "auto"]}
                            interval={Math.floor(data.length / 6)}
                            tickFormatter={(ts) => `${new Date(ts).getDate()}/${new Date(ts).getMonth()+1}`}
                        />
                        <YAxis />
                        <Line type="monotone" dataKey="temperature" name="Temperature" stroke="#8160fa" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#8160fa" }}/>
                        <Line type="monotone" dataKey="dewpoint" name="Dewpoint" stroke="#98c5fb" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#98c5fb" }}/>
                        <Tooltip content={({ active, payload }) => {
                            if (active && payload?.length) {
                                return (
                                    <div className="bg-background border border-border p-2 rounded-md">
                                        temperature: {payload[0].value} {units.temperature} <br />
                                        dewpoint: {payload[1].value} {units.temperature}
                                    </div>
                                );
                            }
                            return null;
                            }}
                        />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}