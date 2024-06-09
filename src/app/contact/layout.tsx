import React from "react";

export default function ContactLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="min-h-screen">
            <h1 className="font-bold">hello!, this is layout head</h1>
            {children}
            <h1 className="font-bold">this is layout foot, bye!</h1>
        </section>
    );
}
