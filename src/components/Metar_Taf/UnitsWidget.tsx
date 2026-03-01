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
          <Select.Trigger className="rounded-md">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-md">
            <ListBox>
              <ListBox.Item id="°C" textValue="°C" className="rounded-md">
                Celsius
              </ListBox.Item>

              <ListBox.Item id="F" textValue="F" className="rounded-md">
                Fahrenheit
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <Select className="w-[256px]" placeholder="Select a unit" value={units["speed"]}
          onChange={(value) => value !== null && changeUnits("speed", value as Units["speed"])}>
          <Label className="text-lg">Speed</Label>
          <Select.Trigger className="rounded-md">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-md">
            <ListBox>
              <ListBox.Item id="km/h" textValue="km/h" className="rounded-md">
                km/h
              </ListBox.Item>

              <ListBox.Item id="Kt" textValue="Kt" className="rounded-md">
                Knots
              </ListBox.Item>

              <ListBox.Item id="m/s" textValue="m/s" className="rounded-md">
                m/s
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        <Select className="w-[256px]" placeholder="Select a unit" value={units["distance"]}
          onChange={(value) => value !== null && changeUnits("distance", value as Units["distance"])}>
          <Label className="text-lg">Distance</Label>
          <Select.Trigger className="rounded-md">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="rounded-md">
            <ListBox>
              <ListBox.Item id="m" textValue="m" className="rounded-md">
                Meters
              </ListBox.Item>

              <ListBox.Item id="ft" textValue="ft" className="rounded-md">
                Feet
              </ListBox.Item>

              <ListBox.Item id="mi" textValue="mi" className="rounded-md">
                Miles
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}