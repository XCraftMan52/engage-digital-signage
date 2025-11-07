'use client';

import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Event } from '../lib/engage';
import Image from 'next/image';

interface EventsDisplayProps {
  initialEvents: Event[];
}

export default function EventsDisplay({ initialEvents }: EventsDisplayProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [currentPage, setCurrentPage] = useState(0);

  const eventsPerPage = 2;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const currentEvents = events.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

  useEffect(() => {
    if (totalPages <= 1) return;
    const rotateTimer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 30000);
    return () => clearInterval(rotateTimer);
  }, [totalPages]);

  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    const refreshTimer = setTimeout(() => window.location.reload(), timeUntilMidnight);
    return () => clearTimeout(refreshTimer);
  }, []);

 useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (!res.ok) throw new Error('Failed to fetch events');
        const data: Event[] = await res.json();
        setEvents(data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  const formatTime = (dateString: string): string => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <main className="flex-1 p-8 flex flex-col justify-center max-h-screen ">
      {events.length === 0 ? (
        <div className="text-center p-16 bg-white/10 rounded-2xl">
          <p className="text-4xl">No events scheduled for today</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2  gap-8 max-w-10xl mx-auto w-full">
            {currentEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-white/97 text-gray-800 rounded-3xl p-10 mx-5 flex flex-col justify-between text-center shadow-2xl min-h-[500px] transition-transform hover:scale-105"
              >
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-indigo-600 leading-tight">
                    {event.name}
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className='flex items-center gap-3 justify-center text-2xl font-semibold'>

                    <div className="flex items-center gap-3 text-2xl font-semibold">
                      <span className="text-3xl">🕐</span>
                      <span className="text-gray-800">
                        {formatTime(event.startsOn)} - {formatTime(event.endsOn)}
                      </span>
                    </div>
                    
                    {event.address && (
                      <div className="flex items-center gap-3 text-xl font-semibold">
                        <span className="text-3xl">📍</span>
                        <span className="text-gray-800">{event.address.name}</span>
                      </div>
                    )}
                  </div>
                     {event.imageUrl && (
                  <Image
                    className="mt-2 items-center rounded-xl mx-auto shadow-lg"
                    src={event.imageUrl}
                    alt={event.name}
                    width={600}
                    height={400}
                  />
                )}
                    
                    {event.description && (
                      <p className="text-lg leading-relaxed text-gray-600 mt-4">
                        {event.description.replace(/<[^>]+>/g, '').substring(0, 200)}
                        {event.description.length > 200 ? '...' : ''}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col items-center gap-4 mt-2 pt-6 border-t-2 border-gray-200">
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <QRCodeCanvas
                      value={`https://riconnect.ric.edu/event/${event.id}`}
                      size={180}
                      level="H"
                    />
                  </div>
                  <p className="text-xl font-bold text-indigo-600 uppercase tracking-wide">
                    Scan to RSVP
                  </p>
                </div>
              </div>
            ))}

            {currentEvents.length === 1 && (
              <div className="bg-white/10 rounded-3xl p-10 flex items-center justify-center min-h-[500px] border-2 border-dashed border-white/30">
                <p className="text-3xl text-center">Check back soon for more events!</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              {Array.from({ length: totalPages }).map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentPage 
                      ? 'bg-white/90 scale-125' 
                      : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
