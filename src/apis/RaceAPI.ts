import { RaceEvent } from "../types/RaceEvent";

export async function GetEvents(): Promise<RaceEvent[]> {
    try {
      const res = await fetch('http://s3-ap-southeast-2.amazonaws.com/bet-easy-code-challenge/next-to-jump');
      const data = await res.json();
      const events = data.result.map((x: any) => (
        {
          EventName: x.EventName, EventType: x.EventTypeDesc,
          StartTime: new Date(x.AdvertisedStartTime).toLocaleString(),
          Venue: x.Venue.Venue,
          EventTypeId: x.EventType.EventTypeID,
          Icon: require(`../assets/images/horse-riding${x.EventType.EventTypeID}.png`)
        }));
      return events;
    } catch (error) {
      console.log(error);
      return [];
    }
  }