import EventsDisplay from '../components/EventsDisplay';
import Header from '../components/Header';
import { fetchTodaysEvents } from '../lib/engage';

export default async function Home() {
  const [events] = await Promise.all([
    fetchTodaysEvents(),
  ]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-600  to-red-800 text-white flex flex-col">
      <Header />
      <EventsDisplay initialEvents={events} />
    </div>
  );
}