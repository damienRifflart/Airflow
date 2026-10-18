"use client";

import { useMemo, useState, type Key } from "react";
import { Autocomplete, EmptyState, ListBox, SearchField } from "@heroui/react";
import airportData from "@/assets/large_airports_list/large_airports";
import type { Airport } from "../../../types/airport";

interface SelectAirportProps {
    setAirport: (airport: Airport) => void;
}

export default function SelectAirport({ setAirport }: SelectAirportProps) {
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

    const handleSelectionChange = (key: Key | null) => {
        if (key == null) return;

        const airport = (airportData as Airport[]).find(
            (a) => a.icao === String(key)
        );

        if (airport) setAirport(airport);
    };

    return (
        <div className="w-full sm:w-[360px]">
            <Autocomplete
                className="w-full"
                placeholder="Search airport, city or ICAO"
                selectionMode="single"
                onSelectionChange={handleSelectionChange}
            >
                <Autocomplete.Trigger className="rounded-md bg-background border border-border">
                    <Autocomplete.Value>
                        {(props) => {
                            const {
                                defaultChildren,
                                isPlaceholder,
                                state,
                            } = props;

                            if (
                                isPlaceholder ||
                                !state.selectedItems?.length
                            ) {
                                return defaultChildren;
                            }

                            const icao = String(
                                state.selectedItems[0].key
                            );

                            const airport = (airportData as Airport[]).find(
                                (a) => a.icao === icao
                            );

                            if (!airport) return defaultChildren;

                            return `${airport.name} (${airport.icao}) – ${airport.city}`;
                        }}
                    </Autocomplete.Value>
                    <Autocomplete.Indicator />
                </Autocomplete.Trigger>

                <Autocomplete.Popover className="rounded-md bg-background border border-border">
                    <Autocomplete.Filter filter={() => true}>
                        <SearchField autoFocus name="search">
                            <SearchField.Group className="rounded-md bg-background">
                                <SearchField.SearchIcon />
                                <SearchField.Input
                                    placeholder="Type city, airport name or ICAO"
                                    value={query}
                                    onChange={setQuery}
                                />
                                <SearchField.ClearButton
                                    className="bg-background"
                                    onClick={() => setQuery("")}
                                />
                            </SearchField.Group>
                        </SearchField>

                        <ListBox
                            renderEmptyState={() => (
                                <EmptyState>No airport found</EmptyState>
                            )}
                        >
                            {filteredAirports.map((airport: Airport) => (
                                <ListBox.Item
                                    key={airport.icao}
                                    id={airport.icao}
                                    textValue={`${airport.name} ${airport.city} ${airport.icao}`}
                                    className="rounded-md bg-background hover:bg-border"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-medium">
                                            {airport.name} ({airport.icao})
                                        </span>
                                        <span className="text-sm opacity-80">
                                            {airport.city}
                                        </span>
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
```
