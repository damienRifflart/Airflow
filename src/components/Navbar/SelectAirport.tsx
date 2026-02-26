"use client";

import { useMemo, useState } from "react";
import { Autocomplete, EmptyState, ListBox, SearchField, Tag, TagGroup } from "@heroui/react";
import airportData from "@/assets/large_airports_list/large_airports";
import type { Airport } from "../../../types/airport";

export default function SelectAirport() {
  const [query, setQuery] = useState("");

  const filteredAirports = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q === "") return airportData.slice(0, 8);

    return airportData
      .filter((a: Airport) => 
        a.icao.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q)
      )
      .slice(0, 8);
  }, [query]);

  const renderSelectedValue = ({ defaultChildren, isPlaceholder, state }: any) => {
    // If nothing is choosen, show placeholder
    if (isPlaceholder || !state.selectedItems?.length) {
      return defaultChildren;
    }

    const icao = state.selectedItems[0].key;
    const airport = (airportData as Airport[]).find(a => a.icao === icao);

    if (!airport) return defaultChildren;

    return (
      <TagGroup size="lg">
        <TagGroup.List>
          <Tag>{airport.name}</Tag>
        </TagGroup.List>
      </TagGroup>
    );
  };

  return (
    <div className="w-[420px]">
      <Autocomplete 
        className="w-full" 
        placeholder="Search airport, city or ICAO" 
        selectionMode="single" 
      >
        <Autocomplete.Trigger>
          <Autocomplete.Value>
            {renderSelectedValue}
          </Autocomplete.Value>
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>

        <Autocomplete.Popover>
          <Autocomplete.Filter filter={() => true}>
            
            <SearchField autoFocus name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input
                  placeholder="Type city, airport name or ICAO"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <SearchField.ClearButton onClick={() => setQuery("")} />
              </SearchField.Group>
            </SearchField>

            <ListBox 
              renderEmptyState={() => <EmptyState>No airport found</EmptyState>}
            >
              {filteredAirports.map((airport: Airport) => (
                <ListBox.Item
                  key={airport.icao}
                  id={airport.icao}
                  textValue={`${airport.name} ${airport.city} ${airport.icao}`}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{airport.name} ({airport.icao})</span>
                    <span className="text-sm opacity-80">{airport.city}</span>
                  </div>
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>

          </Autocomplete.Filter>
        </Autocomplete.Popover>
      </Autocomplete>
    </div>
  );
}