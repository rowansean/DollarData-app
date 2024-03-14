import { Tab, TabGroup, TabList } from '@tremor/react';

export const TabsHero = () => (
  <div className="h-20 flex items-end">
    <TabGroup className='w-fit'>
      <TabList variant="line" defaultValue="1">
        <Tab value="1">tremor.so</Tab>
        <Tab value="2">github.com</Tab>
        <Tab value="3">strava.com</Tab>
      </TabList>
    </TabGroup>
  </div>
);