import Clock from './Clock';

export default function Header() {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <header className="text-center p-8 pb-6 border-b-4 border-white/30">
      <div className="flex justify-between items-start max-w-7xl mx-auto">
        {/* Center - Title & Date */}
        <div className="flex-1">
          <h1 className="text-7xl font-bold mb-2 drop-shadow-lg">Today's Events</h1>
          <div className="text-3xl opacity-95">
            <div className="font-medium">{formatDate(new Date())}</div>
          </div>
        </div>

        {/* Right side - Clock */}
        <div className="flex-1 text-right flex justify-end">
          <Clock />
        </div>
      </div>
    </header>
  );
}