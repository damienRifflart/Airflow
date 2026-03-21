import { Chip, Label, Link, ListBox, Select } from '@heroui/react';
import { Info } from 'lucide-react';
import { format } from 'date-fns';

interface MapsProps {
    temsiLocation: string;
    temsiHour: string;
    frontsHour: string
    setTemsiLocation: (temsiLocation: string) => void;
    setTemsiHour: (temsiHour: string) => void;
    setFrontsHour: (frontsHour: string) => void;
}

export function Maps({temsiLocation, temsiHour, frontsHour, setTemsiLocation, setTemsiHour, setFrontsHour}: MapsProps) {
    const getTemsiURL = (): string => {
        const date = new Date();
        let month: string | number = date.getUTCMonth() + 1;
        if (month < 10) { month = `0${month}` };
        const year = date.getUTCFullYear();
        const day = date.getUTCDate();
        const dateString = `${year}${month}${day}${temsiHour}0000`;
        return `https://aviation.meteo.fr/affiche_image.php?type=sigwx/fr/${temsiLocation}&date=${dateString}&mode=img`;
    };

    const getFrontsURL = (): string => {
        const date = new Date();
        let month: string | number = date.getUTCMonth() + 1;
        if (month < 10) { month = `0${month}` };
        const year = date.getUTCFullYear();
        const day = date.getUTCDate();
        const dateString = `${year}${month}${day}${frontsHour}0000`;
        return `https://aviation.meteo.fr/affiche_image.php?type=front/europeouest&date=${dateString}&mode=img`;
    };
    
    const changeLocation = (newLocation: string) => {
        setTemsiLocation(newLocation);
    }
    const changeTemsiHour = (newHour: string) => {
        setTemsiHour(newHour);
    }
    const changeFrontsHour = (newHour: string) => {
        setFrontsHour(newHour);
    }
    const formattedDate = format(new Date(), "do 'of' MMMM")

    return (
        <div className="flex flex-col gap-3">
            <div className="rounded-md bg-card border border-border p-6 space-y-2">
                <h3 className='text-2xl font-semibold tracking-wider'>CREATE AN ACCOUNT</h3>
                <h3 className="text-lg">In order to see the maps, you must create a free account at&nbsp;
                    <Link href={'https://aviation.meteo.fr/'} target="_blank" className="text-lg">
                        aviation.meteo.fr
                        <Link.Icon />
                    </Link>
                    . This is mandatory, as there is no open APIs to fetch TEMSI and fronts maps.
                </h3>
                <Chip color="accent" variant="soft" className="rounded-md text-lg p-2 gap-2">
                    <Info width={18} />
                    <Chip.Label>You will have to login to&nbsp;
                        <Link href={'https://aviation.meteo.fr/'} target="_blank" className="text-lg">
                            aviation.meteo.fr
                            <Link.Icon />
                        </Link>
                        &nbsp;every time you want to see the maps.
                    </Chip.Label>
                </Chip>
            </div>

            <div className="rounded-md bg-card border border-border p-6">
                <h3 className='text-2xl font-semibold tracking-wider'>TEMSI</h3>
                <div className="mb-10 flex flex-col gap-3 md:ml-5">
                    <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Select className="w-full sm:max-w-[256px]" placeholder="Select a location" onChange={(value) => changeLocation(value as string)} value={temsiLocation}>
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
                        <Select className="w-full sm:max-w-[256px]" placeholder="Select a hour" onChange={(value) => changeTemsiHour(value as string)} value={temsiHour}>
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
                    <h3 className="text-lg">The following link will lead you to the TEMSI map of {temsiLocation === "teuroc" ? "Europe" :"France" } the {formattedDate}, at {temsiHour}h00:&nbsp; 
                        <Link href={getTemsiURL()} target="_blank" className="text-lg">
                            Click to see the TEMSI map
                            <Link.Icon />
                        </Link>.
                    </h3>
                </div>
            </div>

            <div className="rounded-md bg-card border border-border p-6 space-y-2">
                <h3 className='text-2xl font-semibold tracking-wider'>Fronts Map</h3>
                <div className="flex flex-col gap-3 md:ml-5">
                    <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Select className="w-full sm:max-w-[256px]" placeholder="Select a hour" onChange={(value) => changeFrontsHour(value as string)} value={frontsHour}>
                            <Label className="text-lg">Hour</Label>
                            <Select.Trigger className="rounded-md bg-background border border-border">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover className="rounded-md bg-background">
                                <ListBox>
                                    {["00", "06", "12", "18"].map((hour) => {
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
                    <h3 className="text-lg">The following link will lead you to the fronts map of the west of Europe the {formattedDate}, at {frontsHour}h00: &nbsp;
                        <Link href={getFrontsURL()} target="_blank" className="text-lg">
                            Click to see the fronts map
                            <Link.Icon />
                        </Link>.
                    </h3>
                </div>
            </div>
        </div>
    )
}