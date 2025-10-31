import Image from "next/image";
import { fetchTodaysEvents } from "../lib/engage";

export default async function Home() {
  const events = await fetchTodaysEvents();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <h1 className="text-4xl font-bold text-center py-4">Today's Events</h1>
        <div className="grid grid-cols-2 gap-4 p-4 ">
          {events.filter((event) => new Date(event.endsOn) > new Date()).map((event) => (
              <div className="border p-4" key={event.id}>
                <h2 className="text-lg font-semibold">{event.name}</h2>
                <p className="mt-2">
                  {new Date(event.startsOn).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </p>
              <div className="mt-2" dangerouslySetInnerHTML={{ __html: event.description }} />
                {event.imageUrl && (
                  <Image
                    className="mt-2"
                    src={event.imageUrl}
                    alt={event.name}
                    width={400}
                    height={300}
                  />
                )}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
