import React from "react";
export function Card({ children }) {
    return (
    <div className="rounded-2xl border bg-white shadow-sm">
    {children}
    </div>
    );
    }