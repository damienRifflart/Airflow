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
import type { Units } from "../types/units"
import {Footer} from "@/components/Footer" 

export default function App() {
  const [airport, setAirport] = useState<Airport>();
  const [units, setUnits] = useState<Units>({
    temperature: "F",
    speed: "Kt",
    distance: "ft"
  });
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-row justify-between p-10 w-full h-[6rem] bg-card border border-border items-center mb-10">
            <div className="flex flex-row gap-3 justify-center items-center">
                <div className="w-11 h-11 bg-[rgba(147,149,211,0.1)] rounded-lg flex items-center justify-center">
                    <AirflowLogo theme={theme} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Airflow</h1>
                    <p className="text-sm text-muted-foreground">
                    Real-time METAR, TAF & TEMSI Analysis
                    </p>
                </div>
            </div>

            <div className="flex flex-row gap-3">
                <SelectAirport setAirport={setAirport} />
                <ButtonGroup className="[&>button:first-child]:rounded-l-md [&>button:last-child]:rounded-r-md">
                    <Button onPress={toggleTheme} className={`border-l border-b border-t border-border ${theme === "light" ? "bg-card" : "bg-accent"}`} isIconOnly><Moon className='text-foreground' /></Button>
                    <Button onPress={toggleTheme} className={`border-l border-b border-t border-border ${theme === "light" ? "bg-accent" : "bg-card"}`} isIconOnly><Sun className='text-white'/></Button>
                </ButtonGroup>
            </div>
        </header>

      <Tabs className="max-w-full pl-10 pr-10">
        <Tabs.ListContainer>
            <Tabs.List aria-label="Options" className="rounded-md border border-border bg-background gap-3 [&>[data-selected=true]]:text-white">
                <AppTab id="metar_taf" icon={ChartColumn}>Metar & Taf</AppTab>
                <AppTab id="temsi" icon={Map}>TEMSI Maps</AppTab>
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

        <Tabs.Panel className="pt-4" id="temsi">
          <p>Temsi</p>
        </Tabs.Panel>

        <Tabs.Panel className="pt-4" id="charts">
          <p>Charts</p>
        </Tabs.Panel>
      </Tabs>

        <Footer />
    </div>
  )
}

