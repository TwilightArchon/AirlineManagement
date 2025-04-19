import React from "react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function ThreeSlotHeader() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 shadow-md bg-white">
        {/* Slot 1 */}
        <div className="flex-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Procedures</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Home</DropdownMenuItem>
              <DropdownMenuItem>About</DropdownMenuItem>
              <DropdownMenuItem>Services</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Slot 3 */}
        <div className="flex-1 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Views</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem asChild>
          <Link href="/views/alternateAirport">Alternate Airport</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/views/flightsInTheAir">Flights In The Air</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/views/flightsInTheGround">Flights In The Ground</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/views/pepoleInTheAir">People In The Air</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/views/pepoleInTheGround">People In The Ground</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/views/routeSummary">Route Summary</Link>
        </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="p-6">
        <p>This is the main page content.</p>
      </main>
    </div>
  );
}
