import React from "react";

export default function Authlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col items-center justify-center h-full">{children}</div>;
}
