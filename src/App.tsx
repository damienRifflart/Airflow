import './App.css';
import { Navbar } from "@/components/Navbar/Navbar";
import { AppTab } from "@/components/Tab/AppTab";
import { Metar } from "@/components/Metar_Taf/Metar";
import { Taf } from "@/components/Metar_Taf/Taf";
import { ChartColumn, Map, ChartArea } from 'lucide-react';
import { Tabs } from "@heroui/react";

export default function App() {
  return (
    <>
      <Navbar />

      <Tabs className="max-w-full pl-10 pr-10">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options" className="rounded-md border border-border bg-background flex flew-row gap-3">
            <AppTab id="metar_taf" icon={ChartColumn}>Metar & Taf</AppTab>
            <AppTab id="temsi" icon={Map}>TEMSI Maps</AppTab>
            <AppTab id="charts" icon={ChartArea}>Charts</AppTab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel className="flex flex-row gap-3 mt-5" id="metar_taf">
          <Metar />
          <Taf />
        </Tabs.Panel>

        <Tabs.Panel className="pt-4" id="temsi">
          <p>Temsi</p>
        </Tabs.Panel>

        <Tabs.Panel className="pt-4" id="charts">
          <p>Charts</p>
        </Tabs.Panel>
      </Tabs>

    </>
  )
}

