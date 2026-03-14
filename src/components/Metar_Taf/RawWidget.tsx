"use client"

interface RawWidgetProps {
    title: string;
    description: string;
}

export function RawWidget({ title, description }: RawWidgetProps) {
    return (
        <div className="bg-background col-span-3 flex flex-col gap-3 border border-border aspect-rectangle rounded-md p-6">
            <div className="flex flex-row gap-3 items-center">
                <p className="text-muted-foreground text-md">{title}</p>
            </div>
        
            <h3 className="text-lg text-justify">{description}</h3>
        </div>
    );
}