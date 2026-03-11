import { Label, Link, ListBox, Select } from '@heroui/react';
import { format } from 'date-fns';

interface TemsiProps {
    temsiLocation: string;
    temsiHour: string;
    setTemsiLocation: (temsiLocation: string) => void;
    setTemsiHour: (temsiHour: string) => void;
}

export function Temsi({temsiLocation, temsiHour, setTemsiLocation, setTemsiHour}: TemsiProps) {
    const getTemsiURL = (): string => {
            const date = new Date();
            let month: string | number = date.getUTCMonth() + 1;
            if (month < 10) { month = `0${month}` } else { month = month };
            const year = date.getUTCFullYear();
            const day = date.getUTCDate();
            const dateString = `${year}${month}${day}${temsiHour}0000`
            return `https://aviation.meteo.fr/affiche_image.php?type=sigwx/fr/${temsiLocation}&date=${dateString}&mode=img`;
        };
    
        const changeLocation = (newLocation: string) => {
            setTemsiLocation(newLocation);
        }
        const changeHour = (newHour: string) => {
            setTemsiHour(newHour);
        }
        const formattedDate = format(new Date(), "do 'of' MMMM")

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-3">
                <Select className="w-[256px]" placeholder="Select a location" onChange={(value) => changeLocation(value as string)} value={temsiLocation}>
                    <Label className="text-lg">Location</Label>
                    <Select.Trigger className="rounded-md bg-background border border-border">
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="rounded-md bg-background">
                        <ListBox>
                            <ListBox.Item id="teuroc" textValue="Europe" className="rounded-md bg-background hover:bg-border">
                                Europe
                            </ListBox.Item>

                            <ListBox.Item id="france" textValue="France" className="rounded-md bg-background hover:bg-border">
                                France
                            </ListBox.Item>
                        </ListBox>
                    </Select.Popover>
                </Select>
                <Select className="w-[256px]" placeholder="Select a hour" onChange={(value) => changeHour(value as string)} value={temsiHour}>
                    <Label className="text-lg">Hour</Label>
                    <Select.Trigger className="rounded-md bg-background border border-border">
                        <Select.Value />
                        <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="rounded-md bg-background">
                        <ListBox>
                            {["00", "03", "06", "09", "12", "15", "18", "21"].map((hour) => {
                                const isPast = parseInt(hour, 10) > (new Date).getHours();
                                return (
                                    <ListBox.Item key={hour} id={hour} textValue={hour} isDisabled={isPast} className={"rounded-md bg-background hover:bg-border"}>
                                        {hour}
                                    </ListBox.Item>
                                );
                            })}
                        </ListBox>
                    </Select.Popover>
                </Select>
            </div>

            <div className="flex flex-row gap-3">
                <h3 className="text-lg">The following link will lead you to the TEMSI map of {temsiLocation === "teuroc" ? "Europe" :"France" } the {formattedDate}, at 21h00:</h3>
                <Link href={getTemsiURL()} target="_blank" className="text-lg">
                    Click to see the TEMSI map
                    <Link.Icon />
                </Link>
            </div>
        </div>
    )
}