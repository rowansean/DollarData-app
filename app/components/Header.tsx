import React from 'react';
import { TabsHero } from './ui/TabsHero';
import { Icon } from '@tremor/react';

export default function Header() {
  return (
    <div className="w-full bg-white flex">
      <TabsHero />
      <div className="icon-container w-12 h-12">
        <p className="bg-slate-500 rounded-full">SR</p>
      </div>
    </div>
  );
}
