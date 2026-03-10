"use client"

import { Github } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-card py-10 text-center flex justify-center mt-auto">
            <div className="flex flex-row gap-2 max-w-5xl mx-auto px-6">
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
