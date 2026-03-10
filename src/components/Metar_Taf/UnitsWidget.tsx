"use client"

import type { Units } from '../../../types/units';
import { Label, ListBox, Select } from '@heroui/react'

interface SettingsProps {
  units: Units;
  setUnits: (units : Units) => void;
}

export function UnitsWidget({units, setUnits}: SettingsProps) {
  function changeUnits<K extends keyof Units>(measure: K, newUnit: Units[K]) {
    setUnits({
        ...units,
        [measure] : newUnit
    });
  }

  return (
    <div className="rounded-md bg-card border border-border p-6 space-y-2">
      <h3 className="text-2xl font-semibold tracking-wider">UNITS</h3>
      <div className="flex flex-row gap-10">
        <Select className="w-[256px]" placeholder="Select a unit" value={units["temperature"]}
          onChange={(value) => value !== null && changeUnits("temperature", value as Units["temperature"])}>
          <Label className="text-lg">Temperature</Label>
          <Select.Trigger className="rounded-md bg-background border border-border">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-md bg-background">
            <ListBox>
              <ListBox.Item id="°C" textValue="°C" className="rounded-md bg-background hover:bg-border">
                Celsius
              </ListBox.Item>

              <ListBox.Item id="F" textValue="F" className="rounded-md bg-background hover:bg-border">
                Fahrenheit
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <Select className="w-[256px]" placeholder="Select a unit" value={units["speed"]}
          onChange={(value) => value !== null && changeUnits("speed", value as Units["speed"])}>
          <Label className="text-lg">Speed</Label>
          <Select.Trigger className="rounded-md bg-background border border-border">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-md bg-background">
            <ListBox>
              <ListBox.Item id="km/h" textValue="km/h" className="rounded-md bg-background hover:bg-border">
                km/h
              </ListBox.Item>

              <ListBox.Item id="Kt" textValue="Kt" className="rounded-md bg-background hover:bg-border">
                Knots
              </ListBox.Item>

              <ListBox.Item id="m/s" textValue="m/s" className="rounded-md bg-background hover:bg-border">
                m/s
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <Select className="w-[256px]" placeholder="Select a unit" value={units["distance"]}
          onChange={(value) => value !== null && changeUnits("distance", value as Units["distance"])}>
          <Label className="text-lg">Distance</Label>
          <Select.Trigger className="rounded-md bg-background border border-border">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-md bg-background">
            <ListBox>
              <ListBox.Item id="m" textValue="m" className="rounded-md bg-background hover:bg-border">
                Meters
              </ListBox.Item>

              <ListBox.Item id="ft" textValue="ft" className="rounded-md bg-background hover:bg-border">
                Feet
              </ListBox.Item>

              <ListBox.Item id="mi" textValue="mi" className="rounded-md bg-background hover:bg-border">
                Miles
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}