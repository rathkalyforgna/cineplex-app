'use client';

import {Tab} from '@headlessui/react';

export default function Home() {
  return (
    <div>
      <div>Movie Carousel</div>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8">
        <Tab.Group>
          <Tab.List>
            <Tab>Now Showing</Tab>
            <Tab>Coming Soon</Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>Content 1</Tab.Panel>
            <Tab.Panel>Content 2</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
