import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import React from 'react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="flex h-screen border-collapse overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto overflow-x-hidden pt-12 bg-secondary/10 pb-1">
                    {children}
                </main>
            </div>
        </>
    );
};
