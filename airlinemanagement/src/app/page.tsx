import Image from "next/image";
import DatabaseTestButton from "./components/DatabaseTestButton";
import AddAirplaneForm from "./components/AddAirplaneForm";
import CustomQueryForm from "./components/CustomQueryForm";
import ShowAirplanes from "./components/ShowAirplanes";
import React from "react";
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
              <Button variant="outline">Menu 1</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Home</DropdownMenuItem>
              <DropdownMenuItem>About</DropdownMenuItem>
              <DropdownMenuItem>Services</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Slot 2 */}
        <div className="flex-1 text-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu 2</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Projects</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Careers</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Slot 3 */}
        <div className="flex-1 text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu 3</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Login</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex flex-col gap-[32px] items-center sm:items-start p-6">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        {/* Database Connection Test */}
        <div className="w-full max-w-md mb-8">
          <DatabaseTestButton />
        </div>
        
        {/* Custom SQL Query Form */}
        <div className="w-full max-w-2xl mb-8">
          <CustomQueryForm />
        </div>
        
        {/* Show Airplanes */}
        <div className="w-full max-w-2xl mb-8">
          <ShowAirplanes />
        </div>
        
        {/* Add Airplane Form */}
        <div className="w-full max-w-2xl mb-8">
          <AddAirplaneForm />
        </div>
        
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>
      </main>
    </div>
  );
}
