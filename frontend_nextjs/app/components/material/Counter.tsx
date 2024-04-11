"use client";
import {
  generateGreeting,
  increment,
} from "@/app/components/material/action.tsx";
import { ReactNode, useState } from "react";

export default function Counter() {
  const [greeting, setGreeting] = useState<ReactNode | null>(null);

  const handleClick = async () => {
    const newValue = await increment(123);
    console.log("New value on client", newValue);
  };

  return (
    <div>
      <button onClick={() => handleClick()}>INCREMENT</button>;
      <button
        onClick={async () => {
          const g = await generateGreeting();
          setGreeting(g);
        }}
      >
        Greet!
      </button>
      {greeting}
    </div>
  );
}
