import { Controller, Get, Query, Route } from "tsoa";
import createClient = require('hafas-client');
import dbProfile = require('hafas-client/p/db');
import { Stop, Location, Station } from './hafas-client-types';

@Route("hafas")
export class HafasController extends Controller {
  /**
   * Retrieves locations or stops
   * @param name name of station
   * @param fuzzy find only exact matches?
   * @param results how many search results
   * @param stops Show stops/stations?
   * @param addresses Show addresses?
   * @param poi Show points of interest?
   * @param linesOfStops Parse & return lines of each stop/station?
   * @param language Language of the results.
   * 
   * @isInt results
   */
  @Get("locations")
  public async getLocations(
    @Query() name: string,
    @Query() fuzzy = true,
    @Query() results = 10,
    @Query() stops = true,
    @Query() addresses = false,
    @Query() poi = true,
    @Query() linesOfStops = false,
    @Query() language = 'en',

  ): Promise<Array<Station | Stop | Location>> {
    const client = createClient(dbProfile, 'client');
    return await client.locations(name, { fuzzy, results, stops, addresses, poi, linesOfStops, language }) as Array<Station | Stop | Location>;
  }
}