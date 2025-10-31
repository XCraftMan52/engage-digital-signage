import Image from "next/image";
import { fetchTodaysEvents } from "../lib/engage";

export default async function Home() {
  const events = await fetchTodaysEvents();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main>
        <div className="grid grid-cols-2 gap-4 p-4 ">
            {events.map((event) => (
              <div className="border p-4" key={event.id}>
                <h2>{event.name}</h2>
              <div dangerouslySetInnerHTML={{ __html: event.description }} />
              <p>
                {new Date(event.startsOn).toLocaleString()} -{" "}
                {new Date(event.endsOn).toLocaleString()}
              </p>
                {event.imageUrl && (
                  <Image
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
