# Generate controller methods

Generate controller methods from a TypeScript declaration file.

## Usage

```
node build/generator/index.js --file <file> --method <method> [-x <exclude properties>]
```

The method should return a Promise. 

If a parameter of the method has an interface type, the interface properties are transfered to query parameters of the rest api method.

## Example

The program

```
node build/generator/index.js --file ./types/hafas-client/index.d.ts --method locations
```

generates the following controller method for the **locations** method in [HafasClient](../../types/hafas-client/index.d.ts) api.

The properties of type **LocationsOptions** are transfered to query parameters.

```js
  /**
  * Retrieves locations or stops
  * @param from 
  * @param fuzzy find only exact matches?
  * @param results how many search results?
  * @param stops return stops/stations?
  * @param addresses return addresses
  * @param poi points of interest
  * @param linesOfStops parse & expose lines at each stop/station?
  * @param language Language of the results
  */
  @Get("locations")
  public async getlocations(
    @Query() from: string,
    @Query() fuzzy = true,
    @Query() results = 10,
    @Query() stops = true,
    @Query() addresses = false,
    @Query() poi = true,
    @Query() linesOfStops = false,
    @Query() language = "en",
  ): Promise<Array<Station | Stop | Location>> {
    const client = this.clientFactory();
    return await client.locations(from, { fuzzy, results, stops, addresses, poi, linesOfStops, language }) as Array<Station | Stop | Location>;
  }
```
