import React from "react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import DatabaseTestButton from "./components/DatabaseTestButton";
import CustomQueryForm from "./components/CustomQueryForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="sticky top-0 z-10 flex justify-between items-center p-4 shadow-md bg-white">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-blue-700">Airline Management System</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">Procedures</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md">
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/add_airplane">Add Airplane</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/add_airport">Add Airport</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/add_person">Add Person</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/assign_pilot">Assign Pilot</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/flight_landing">Flight Landing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/flight_takeoff">Flight Takeoff</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/grant_or_revoke_pilot_license">Grant/Revoke Pilot License</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/offer_flight">Offer Flight</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/passengers_board">Passengers Board</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/passengers_disembark">Passengers Disembark</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/recycle_crew">Recycle Crew</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/retire_flight">Retire Flight</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/procedures/simulation_cycle">Simulation Cycle</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50">Views</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md">
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/views/alternateAirport">Alternate Airport</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/views/flightsInTheAir">Flights In The Air</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/views/flightsInTheGround">Flights In The Ground</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/views/peopleInTheAir">People In The Air</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/views/peopleInTheGround">People In The Ground</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="w-full py-2 hover:bg-blue-50" href="/views/routeSummary">Route Summary</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div>
          <DatabaseTestButton />
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Custom SQL Query</h2>
          <CustomQueryForm />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-medium mb-3 text-gray-800 border-b pb-2">Quick Access</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/procedures/add_airplane">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Add Airplane</Button>
              </Link>
              <Link href="/procedures/add_person">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Add Person</Button>
              </Link>
              <Link href="/procedures/offer_flight">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Offer Flight</Button>
              </Link>
              <Link href="/views/flightsInTheAir">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Flights In Air</Button>
              </Link>
            </div>
          </div>
          

        </div>
        

      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>Airline Management System - CS4400 Database Project</p>
      </footer>
    </div>
  );
}