"use client"
import { AirflowLogo } from "@/components/Navbar/Logo"
import SelectAirport from "@/components/Navbar/SelectAirport"

export function Navbar() {
    return(
        <header className="flex flex-row justify-between p-4 w-full h-[6rem] bg-[var(--card)] border border-border items-center">
            <div className="flex flex-row gap-3 justify-center items-center">
                <div className="w-11 h-11 bg-[rgba(147,149,211,0.1)] rounded-lg flex items-center justify-center">
                    <AirflowLogo />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Airflow</h1>
                    <p className="text-sm text-muted-foreground">
                    Real-time METAR, TAF & TEMSI Analysis
                    </p>
                </div>
            </div>

            <SelectAirport />
        </header>
    )
}