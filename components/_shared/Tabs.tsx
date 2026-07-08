import React, { useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
interface TabProps {
  items: Array<{ title: string; content: React.ReactNode; id: string }>;
}
export default function Tabs({ items }: TabProps) {
  return (
    <>
      <Tab.Group>
        <Tab.List className="flex gap-1 border-b border-eiti-border">
          {items.map((item, index) => (
            <Tab
              key={item.id}
              className="focus:outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eiti-amber"
            >
              {({ selected }) => (
                <span
                  className={`inline-block px-4 py-3 text-xs font-bold uppercase tracking-label border-b-2 -mb-px transition-colors ${
                    selected
                      ? "border-eiti-amber text-accent"
                      : "border-transparent text-eiti-muted hover:text-accent"
                  }`}
                >
                  {item.title}
                </span>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {items.map((item) => (
            <Tab.Panel
              key={item.id}
              className="flex items-center flex-wrap overflow-y-auto"
            >
              {item.content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
