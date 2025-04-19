// import Image from "next/image";
// import DatabaseTestButton from "./components/DatabaseTestButton";
// import AddAirplaneForm from "./components/AddAirplaneForm";
// import CustomQueryForm from "./components/CustomQueryForm";
// import ShowAirplanes from "./components/ShowAirplanes";
// import ViewDisplay from "./components/ViewDisplay";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <header className="flex justify-between items-center p-4 shadow-md bg-white">
//         <div className="flex-1">
//           <h1 className="text-xl font-bold">Airline Management System</h1>
//         </div>
//       </header>

//       <main className="flex flex-col gap-[32px] items-center sm:items-start p-6">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
        
//         {/* Database Connection Test */}
//         <div className="w-full max-w-md mb-8">
//           <DatabaseTestButton />
//         </div>
        
//         {/* Custom SQL Query Form */}
//         <div className="w-full max-w-2xl mb-8">
//           <CustomQueryForm />
//         </div>
        
//         {/* View Display */}
//         <div className="w-full max-w-2xl mb-8">
//           <ViewDisplay />
//         </div>
        
//         {/* Show Airplanes */}
//         <div className="w-full max-w-2xl mb-8">
//           <ShowAirplanes />
//         </div>
        
//         {/* Add Airplane Form */}
//         <div className="w-full max-w-2xl mb-8">
//           <AddAirplaneForm />
//         </div>
//       </main>
//     </div>
//   );
// }import React from "react";
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
              <DropdownMenuItem asChild>
                <Link href="/procedures/add_airplane">Add Airplane</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/add_airport">Add Airport</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/add_person">Add Person</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/assign_pilot">Assign Pilot</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/flight_landing">Flight Landing</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/flight_takeoff">Flight Takeoff</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/grant_or_revoke_pilot_license">Grant/Revoke Pilot License</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/offer_flight">Offer Flight</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/passengers_board">Passengers Board</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/passengers_disembark">Passengers Disembark</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/recycle_crew">Recycle Crew</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/retire_flight">Retire Flight</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/procedures/simulation_cycle">Simulation Cycle</Link>
              </DropdownMenuItem>
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
          <Link href="/views/peopleInTheAir">People In The Air</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/views/peopleInTheGround">People In The Ground</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/views/routeSummary">Route Summary</Link>
        </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

    </div>
  );
}