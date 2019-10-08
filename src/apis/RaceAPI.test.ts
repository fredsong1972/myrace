import { GetEvents } from './RaceAPI';


describe('testing api', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  it('calls api and returns data to me', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      result: [
        {
          EventName: "Race 1",
          EventType: { EventTypeID: 2 },
          EventTypeDesc: "Trots",
          AdvertisedStartTime: "2018-11-27T00:49:00Z",
          Venue: { Venue: "Park 1" }
        }
      ]
    }));
    //assert on the response
    const res = await GetEvents();
    expect(res.length).toEqual(1);
    expect(res[0].EventName).toEqual("Race 1");
    expect(res[0].EventType).toEqual("Trots");
    //assert on the times called and arguments given to fetch
    expect(fetchMock.mock.calls.length).toEqual(1);

  })
});
