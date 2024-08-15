"use client";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("../component/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <MapComponent />
    </div>
  );
}
