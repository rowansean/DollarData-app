import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { InfoIcon } from "lucide-react";

export default function InfoHoverCard({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger>
          <InfoIcon className="w-5 h-5" />
        </HoverCardTrigger>
        <HoverCardContent>{children}</HoverCardContent>
      </HoverCard>
    </div>
  );
}
