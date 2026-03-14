import './App.css';
import { AirflowLogo } from "@/components/Navbar/Logo"
import SelectAirport from "@/components/Navbar/SelectAirport"
import { AppTab } from "@/components/Tab/AppTab";
import { Metar } from "@/components/Metar_Taf/Metar";
import { Taf } from "@/components/Metar_Taf/Taf";
import { UnitsWidget } from "@/components/Metar_Taf/UnitsWidget";
import { ChartColumn, Map, ChartArea, Moon, Sun } from 'lucide-react';
import { Button, ButtonGroup, Tabs } from "@heroui/react";
import { useState } from 'react';
import type { Airport } from "../types/airport";
import { useTheme } from "@/components/ThemeProvider";
import type { Units } from "../types/units";
import { Footer } from "@/components/Footer";
import { Maps } from "@/components/Maps";
import { Charts } from "@/components/Charts";

export default function App() {
    const [airport, setAirport] = useState<Airport>();
    const [temsiLocation, setTemsiLocation] = useState<string>("france");
    const [temsiHour, setTemsiHour] = useState<string>("00");
    const [frontsHour, setFrontsHour] = useState<string>("00");
    const [units, setUnits] = useState<Units>({
        temperature: "°F",
        speed: "Kt",
        distance: "ft"
    });
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
            <header className="mb-6 flex w-full flex-col gap-4 border border-border bg-card px-4 py-5 sm:mb-8 sm:px-6 lg:mb-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
                <div className="flex min-w-0 flex-row items-center gap-3">
                    <div className="w-11 h-11 bg-[rgba(147,149,211,0.1)] rounded-lg flex items-center justify-center">
                        <AirflowLogo theme={theme} />
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-xl font-bold sm:text-2xl">Airflow</h1>
                        <p className="text-xs text-muted-foreground sm:text-sm">
                            Real-time METAR, TAF & TEMSI Analysis
                        </p>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto">
                    <SelectAirport setAirport={setAirport} />
                    <ButtonGroup className="self-end sm:self-auto [&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md">
                        <Button onPress={toggleTheme} className={`border-l border-b border-t border-border ${theme === "light" ? "bg-card" : "bg-accent"}`} isIconOnly><Moon className='text-foreground' /></Button>
                        <Button onPress={toggleTheme} className={`border-l border-b border-t border-border ${theme === "light" ? "bg-accent" : "bg-card"}`} isIconOnly><Sun className='text-white'/></Button>
                    </ButtonGroup>
                </div>
            </header>

            <Tabs className="w-full max-w-full px-4 pb-8 sm:px-6 sm:pb-10 lg:px-10">
                <Tabs.ListContainer>
                    <Tabs.List aria-label="Options" className="grid w-full grid-cols-1 gap-2 rounded-md border border-border bg-card p-1 sm:grid-cols-3 sm:gap-3 [&>[data-selected=true]]:text-white">
                        <AppTab id="metar_taf" icon={ChartColumn}>Metar & Taf</AppTab>
                        <AppTab id="maps" icon={Map}>Maps</AppTab>
                        <AppTab id="charts" icon={ChartArea}>Charts</AppTab>
                    </Tabs.List>
                </Tabs.ListContainer>

                <Tabs.Panel className="mt-5" id="metar_taf">
                    <div className="flex flex-col gap-3">
                        <UnitsWidget units={units} setUnits={setUnits} />
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1"><Metar airport={airport} units={units} /></div>
                            <div className="flex-1"><Taf airport={airport} units={units} /></div>
                        </div>
                    </div>
                </Tabs.Panel>

                <Tabs.Panel className="mt-5" id="maps">
                    <Maps temsiLocation={temsiLocation} temsiHour={temsiHour} frontsHour={frontsHour} setTemsiLocation={setTemsiLocation} setTemsiHour={setTemsiHour} setFrontsHour={setFrontsHour} />
                </Tabs.Panel>

                <Tabs.Panel className="mt-5" id="charts">
                    <Charts airport={airport} units={units} />
                </Tabs.Panel>
            </Tabs>

            <Footer />
        </div>
    )
}
