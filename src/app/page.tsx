import { Button, Card } from "@tremor/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Card className="mx-auto max-w-xs">
        <p className="text-center text-slate-400">Card</p>
      </Card>

      <Button className="mt-8">Button</Button>
    </main>
  );
}
