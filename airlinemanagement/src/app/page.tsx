import Image from "next/image";
import DatabaseTestButton from "./components/DatabaseTestButton";
import AddAirplaneForm from "./components/AddAirplaneForm";
import CustomQueryForm from "./components/CustomQueryForm";
import ShowAirplanes from "./components/ShowAirplanes";
import ViewDisplay from "./components/ViewDisplay";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center p-4 shadow-md bg-white">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Airline Management System</h1>
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
        
        {/* View Display */}
        <div className="w-full max-w-2xl mb-8">
          <ViewDisplay />
        </div>
        
        {/* Show Airplanes */}
        <div className="w-full max-w-2xl mb-8">
          <ShowAirplanes />
        </div>
        
        {/* Add Airplane Form */}
        <div className="w-full max-w-2xl mb-8">
          <AddAirplaneForm />
        </div>
      </main>
    </div>
  );
}
