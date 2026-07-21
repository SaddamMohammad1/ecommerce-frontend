import type { ReactNode } from "react";

import { Header } from "../Header";
import { Footer } from "../Footer";

interface ShopLayoutProps {
    children: ReactNode;
}

export default function ShopLayout({
    children,
}: ShopLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />

            <main className="flex-1">
                {children}
            </main>

            <Footer />
        </div>
    );
}