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

      <main className="p-6">
        <p>This is the main page content.</p>
      </main>
    </div>
  );
}