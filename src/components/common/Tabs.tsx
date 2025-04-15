// src/components/common/Tabs.tsx
import React, { useState } from 'react';

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface TabsProps {
    tabs: Tab[];
    defaultTab?: string;
    className?: string;
}

const Tabs: React.FC<TabsProps> = ({
                                       tabs,
                                       defaultTab,
                                       className = '',
                                   }) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

    return (
        <div className={className}>
            <div className="border-b border-neutral-200">
                <nav className="flex -mb-px space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${
                                activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                            }
              `}
                            aria-current={activeTab === tab.id ? 'page' : undefined}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="pt-4">
                {tabs.find((tab) => tab.id === activeTab)?.content}
            </div>
        </div>
    );
};

export default Tabs;