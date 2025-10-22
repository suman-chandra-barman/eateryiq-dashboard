"use client";

import SupportQueryCard from "@/components/Admin/Card/SupportQueryCard";

interface SupportQuery {
  id: string;
  userName: string;
  email: string;
  role?: string;
  message: string;
  userImage?: string;
}

export default function SupportPage() {
  const supportQueries: SupportQuery[] = [
    {
      id: "1",
      userName: "Jhon Marble",
      email: "hello@gmail.com",
      role: "Operator",
      message:
        "You want a real system where it saves and shows support messages automatically.",
      userImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AD%20Details-kRQdsethl3h7Z2NMfmGBoc7KoAICT6.png",
    },
    {
      id: "2",
      userName: "Jhon Marble",
      email: "hello@gmail.com",
      role: undefined,
      message:
        "You want a real system where it saves and shows support messages automatically.",
      userImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AD%20Details-kRQdsethl3h7Z2NMfmGBoc7KoAICT6.png",
    },
    {
      id: "3",
      userName: "Jhon Marble",
      email: "hello@gmail.com",
      role: "Manager",
      message:
        "You want a real system where it saves and shows support messages automatically.",
      userImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AD%20Details-kRQdsethl3h7Z2NMfmGBoc7KoAICT6.png",
    },
    {
      id: "4",
      userName: "Jhon Marble",
      email: "hello@gmail.com",
      role: "Operator",
      message:
        "You want a real system where it saves and shows support messages automatically.",
      userImage: undefined,
    },
  ];

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Support</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportQueries.map((query) => (
            <SupportQueryCard key={query.id} query={query} />
          ))}
        </div>
      </main>
    </div>
  );
}
