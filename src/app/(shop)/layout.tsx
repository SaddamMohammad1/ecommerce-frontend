import type { ReactNode } from "react";

import { AuthGuard } from "@/components/auth";
import { ShopLayout } from "@/components/layout";

interface LayoutProps {
    children: ReactNode;
}

export default function Layout({
    children,
}: LayoutProps) {
    return (
        <AuthGuard>
            <ShopLayout>
                {children}
            </ShopLayout>
        </AuthGuard>
    );
}