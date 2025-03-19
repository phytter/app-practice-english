import { Navbar } from "@/components/layout/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container px-8 mx-auto py-8">{children}</main>
    </div>
  );
}