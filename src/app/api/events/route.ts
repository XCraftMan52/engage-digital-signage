// app/api/events/route.ts
import { fetchTodaysEvents } from '../../../lib/engage';

export async function GET() {
  try {
    const events = await fetchTodaysEvents(); // server-side, has access to key
    return new Response(JSON.stringify(events), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
