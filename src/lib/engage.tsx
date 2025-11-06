interface Address {
  locationId: number | null;
  name: string;
  address: string | null;
  line1: string | null;
  line2: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  latitude: number | null;
  longitude: number | null;
  onlineLocation: string | null;
  instructions: string | null;
}

export interface Event {
  id: number;
  submittedByOrganizationId: number;
  organizationIds: number[];
  imageUrl: string;
  name: string;
  description: string;
  startsOn: string;
  endsOn: string;
  address: Address;
}

interface EngageApiEventParams {
  startsAfter?: string;
  endsBefore?: string;
  expandSubmittedById?: boolean;
  orderByField?: string;
}

export async function fetchTodaysEvents(): Promise<Event[]> {
    const apiKey = process.env.ENGAGE_API_KEY;

  if (!apiKey) {
        console.warn('ENGAGE_API_KEY not set, returning empty events array.');
        return []; // <-- just return empty array so build succeeds
    }

    const date = new Date();
    const todayStart = new Date(date.setHours(0, 0, 0, 0)).toISOString();
    const todayEnd = new Date(date.setHours(23, 59, 59, 999)).toISOString();

    const params: EngageApiEventParams = {
        startsAfter: todayStart,
        endsBefore: todayEnd,
        expandSubmittedById: true,
        orderByField: 'startdatetime',
    };

    const response = await fetch(`https://engage-api.campuslabs.com/api/v3.0/events/event?${new URLSearchParams(params as any)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Engage-Api-Key': `${process.env.ENGAGE_API_KEY}`,
    },
    cache: 'no-store'


    });
    
    if (!response.ok) {
        throw new Error(`Error fetching events: ${response.statusText}`);
    }

    const data = await response.json();
    return data.items as Event[];
  }