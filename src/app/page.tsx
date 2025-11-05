import EventsDisplay from '../components/EventsDisplay';
import Header from '../components/Header';
import { fetchTodaysEvents } from '../lib/engage';

export default async function Home() {
  const [events] = await Promise.all([
    fetchTodaysEvents(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-white to-blue-800 text-white flex flex-col">
      <Header />
      <EventsDisplay initialEvents={events} />
    </div>
  );
}