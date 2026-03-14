"use client"

import { Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="mt-auto flex justify-center bg-card py-8 text-center sm:py-10">
            <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 sm:flex-row">
                <div className="flex flex-row">
                    <Github 
                        onClick={() => window.open("https://github.com/damienRifflart/Airflow", "_blank")}
                    />
                </div>
                <p className="text-foreground">© 2026 Airflow. All rights reserved.</p>
            </div>
        </footer>
    )
}
