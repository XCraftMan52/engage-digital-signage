import EventsDisplay from '../components/EventsDisplay';
import Header from '../components/Header';
import { fetchTodaysEvents } from '../lib/engage';

export default async function Home() {
  const [events] = await Promise.all([
    fetchTodaysEvents(),
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-grey-300 to-red-800 text-white flex flex-col">
      <Header />
      <EventsDisplay initialEvents={events} />
    </div>
  );
}