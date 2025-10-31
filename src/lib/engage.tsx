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

interface EventItem {
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

export async function fetchTodaysEvents(): Promise<EventItem[]> {
    const apiKey = process.env.ENGAGE_API_KEY;

    if (!apiKey) {
        throw new Error('ENGAGE_API_KEY is not defined in environment variables.');
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
    return data.items as EventItem[];
  }