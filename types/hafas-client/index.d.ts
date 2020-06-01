// Type definitions for hafas-client 5.6
// Project: https://github.com/public-transport/hafas-client
// Definitions by: Jürgen Bergmann <https://github.com/bergmannjg>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export = createClient;

declare function createClient(profile: createClient.Profile, userAgent: string): createClient.HafasClient;

declare namespace createClient {
    interface ProductType {
        id: string;
        mode: string;
        name: string;
        short: string;
    }

    interface Profile {
        locale: string;
        products: ReadonlyArray<ProductType>;
        trip?: boolean;
        radar?: boolean;
        refreshJourney?: boolean;
        reachableFrom?: boolean;
    }

    interface Location {
        type: 'location';
        id?: string;
        name?: string;
        poi?: boolean;
        address?: string;
        longitude?: number;
        latitude?: number;
        altitude?: number;
    }

    /** Each public transportation network exposes its products as boolean properties. See {@link ProductType} */
    interface Products {
        [product: string]: boolean;
    }

    interface Facilities {
        [product: string]: string | boolean;
    }

    interface ReisezentrumOpeningHours {
        Mo?: string;
        Di?: string;
        Mi?: string;
        Do?: string;
        Fr?: string;
        Sa?: string;
        So?: string;
    }

    interface Station {
        type: 'station';
        id: string;
        name: string;
        station?: Station;
        location?: Location;
        products?: Products;
        isMeta?: boolean;
        /** region ids */
        regions?: ReadonlyArray<string>;
        facilities?: Facilities;
        reisezentrumOpeningHours?: ReisezentrumOpeningHours;
    }

    interface Stop {
        type: 'stop';
        id: string;
        name: string;
        station?: Station;
        location?: Location;
        products: Products;
        lines?: ReadonlyArray<Line>;
        isMeta?: boolean;
        reisezentrumOpeningHours?: ReisezentrumOpeningHours;
    }

    interface Region {
        type: 'region';
        id: string;
        name: string;
        /** station ids */
        stations: ReadonlyArray<string>;
    }

    interface Line {
        type: 'line';
        id?: string;
        name?: string;
        adminCode?: string;
        fahrtNr?: string;
        additionalName?: string;
        product?: string;
        public?: boolean;
        mode: 'train' | 'bus' | 'watercraft' | 'taxi' | 'gondola' | 'aircraft' | 'car' | 'bicycle' | 'walking';
        /** routes ids */
        routes?: ReadonlyArray<string>;
        operator?: Operator;
        express?: boolean;
        metro?: boolean;
        night?: boolean;
        nr?: number;
        symbol?: string;
    }

    interface Route {
        type: 'route';
        id: string;
        line: string;
        mode: 'train' | 'bus' | 'watercraft' | 'taxi' | 'gondola' | 'aircraft' | 'car' | 'bicycle' | 'walking';
        /** stop ids */
        stops: ReadonlyArray<string>;
    }

    interface Cycle {
        min?: number;
        max?: number;
        nr?: number;
    }

    interface ArrivalDeparture {
        arrival?: number;
        departure?: number;
    }

    interface Schedule {
        type: 'schedule';
        id: string;
        route: string;
        mode: 'train' | 'bus' | 'watercraft' | 'taxi' | 'gondola' | 'aircraft' | 'car' | 'bicycle' | 'walking';
        sequence: ReadonlyArray<ArrivalDeparture>;
        /** array of Unix timestamps */
        starts: ReadonlyArray<string>;
    }

    interface Operator {
        type: 'operator';
        id: string;
        name: string;
    }

    interface Hint {
        type: 'hint';
        code?: string;
        summary?: string;
        text: string;
        tripId?: string;
    }

    interface Geometry {
        type: 'point';
        coordinates: number[];
    }

    interface Feature {
        type: 'Feature';
        properties?: Station | Stop;
        geometry: Geometry;
    }

    interface FeatureCollection {
        type: 'FeatureCollection';
        features: ReadonlyArray<Feature>;
    }

    interface StopOver {
        stop: Station | Stop;
        /** null, if last stopOver of trip */
        departure?: string;
        departureDelay?: number;
        plannedDeparture?: string;
        departurePlatform?: string;
        plannedDeparturePlatform?: string;
        /** null, if first stopOver of trip */
        arrival?: string;
        arrivalDelay?: number;
        plannedArrival?: string;
        arrivalPlatform?: string;
        plannedArrivalPlatform?: string;
        remarks?: ReadonlyArray<Hint>;
    }

    interface Trip {
        id: string;
        origin: Stop;
        departure: string;
        departurePlatform?: string;
        plannedDeparture: string;
        plannedDeparturePlatform?: string;
        departureDelay?: number;
        destination: Stop;
        arrival: string;
        arrivalPlatform?: string;
        plannedArrival: string;
        plannedArrivalPlatform?: string;
        arrivalDelay?: number;
        stopovers: ReadonlyArray<StopOver>;
        remarks?: ReadonlyArray<Hint>;
        line?: Line;
        direction?: string;
        reachable?: boolean;
        polyline?: FeatureCollection;
    }

    interface Price {
        amount: number;
        currency: string;
        hint?: string;
    }

    interface Alternative {
        tripId: string;
        direction?: string;
        line?: Line;
        stop?: Station | Stop;
        plannedWhen?: string;
        when?: string;
        delay?: number;
        platform?: string;
        plannedPlatform?: string;
        remarks?: ReadonlyArray<Hint>;
        cancelled?: boolean;
        loadFactor?: string;
    }

    interface Leg {
        tripId?: string;
        origin: Station | Stop;
        destination: Station | Stop;
        departure?: string;
        plannedDeparture: string;
        departureDelay?: number;
        departurePlatform?: string;
        plannedDeparturePlatform?: string;
        arrival?: string;
        plannedArrival: string;
        arrivalDelay?: number;
        arrivalPlatform?: string;
        plannedArrivalPlatform?: string;
        stopovers?: ReadonlyArray<StopOver>;
        schedule?: number;
        price?: Price;
        operator?: number;
        direction?: string;
        line?: Line;
        reachable?: boolean;
        cancelled?: boolean;
        walking?: boolean;
        loadFactor?: string;
        distance?: number;
        public?: boolean;
        transfer?: boolean;
        cycle?: Cycle;
        alternatives?: ReadonlyArray<Alternative>;
        polyline?: FeatureCollection;
        remarks?: ReadonlyArray<Hint>;
    }

    interface ScheduledDays {
        [day: string]: boolean;
    }

    interface Journey {
        type: 'journey';
        legs: ReadonlyArray<Leg>;
        refreshToken?: string;
        remarks?: ReadonlyArray<Hint>;
        price?: Price;
        cycle?: Cycle;
        scheduledDays?: ScheduledDays;
    }

    interface Journeys {
        earlierRef?: string;
        laterRef?: string;
        journeys: ReadonlyArray<Journey>;
    }

    interface Duration {
        duration: number;
        stations: ReadonlyArray<Station | Stop>;
    }

    interface JourneysOptions {
        /** departure date, undefined corresponds to Date.Now
            @default undefined 
         */
        departure?: Date;
        /** arrival date, departure and arrival are mutually exclusive.
            @default undefined 
         */
        arrival?: Date;
        /** earlierThan, use {@link Journeys#earlierRef}, earlierThan and departure/arrival are mutually exclusive.
             @default undefined 
         */
        earlierThan?: string;
        /** laterThan, use {@link Journeys#laterRef}, laterThan and departure/arrival are mutually exclusive.
            @default undefined 
         */
        laterThan?: string;
        /** how many search results?
            @default 3
         */
        results?: number;
        /**  let journeys pass this station
            @default undefined
         */
        via?: string;
        /** return stations on the way?
            @default false
         */
        stopovers?: boolean;
        /** Maximum nr of transfers. Default: Let HAFAS decide. 
            @default 10
         */
        transfers?: number;
        /** minimum time for a single transfer in minutes 
            @default 10
         */
        transferTime?: number;
        /** 'none', 'partial' or 'complete' 
            @default none
         */
        accessibility?: string;
        /** only bike-friendly journeys 
            @default false
         */
        bike?: boolean;
        products?: Products;
        /** return tickets? only available with some profiles 
            @default false
         */
        tickets?: boolean;
        /** return a shape for each leg? 
            @default false
         */
        polylines?: boolean;
        /** parse & expose sub-stops of stations? */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations? */
        entrances?: boolean;
        /** parse & expose hints & warnings? 
            @default false
         */
        remarks?: boolean;
        /** 'slow', 'normal', 'fast' 
            @default slow
         */
        walkingSpeed?: string;
        /**  
            @default false
         */
        startWithWalking?: boolean;
        /** language to get results in 
            @default en
         */
        language?: string;
        /** parse which days each journey is valid on
            @default false
         */
        scheduledDays?: boolean;
    }

    interface LocationsOptions {
        /** find only exact matches? 
            @default true 
         */
        fuzzy?: boolean;
        /** how many search results?
            @default 10
         */
        results?: number;
        /** return stops/stations? 
         *  @default true 
        */
        stops?: boolean;
        /** return addresses
         *  @default false 
        */
        addresses?: boolean;
        /** points of interest
         * @default true
        */
        poi?: boolean;
        /** parse & expose lines at each stop/station? 
         * @default false
        */
        linesOfStops?: boolean;
        /** Language of the results
         *  @default en
        */
        language?: string;
    }

    interface TripOptions {
        /** return stations on the way? */
        stopovers?: boolean;
        /** return a shape for the trip? */
        polyline?: boolean;
        /** parse & expose sub-stops of stations? */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations? */
        entrances?: boolean;
        /**  parse & expose hints & warnings? */
        remarks?: boolean;
        language?: string;
    }

    interface StopOptions {
        /** parse & expose lines at the stop/station? */
        linesOfStops?: boolean;
        /** parse & expose sub-stops of stations? */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations? */
        entrances?: boolean;
        language?: string;
    }

    interface DeparturesArrivalsOptions {
        /** departure date, undefined corresponds to Date.Now
            @default undefined 
         */
        when?: Date;
        /** only show departures heading to this station
           @default undefined 
        */
        direction?: string;
        /** show departures for the next n minutes
           @default 120 
        */
        duration?: number;
        /**  max. number of results; `null` means "whatever HAFAS wants"
          @default 10 
       */
        results?: number;
        /** parse & expose sub-stops of stations? */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations? */
        entrances?: boolean;
        /** parse & expose lines at the stop/station?
          @default false 
       */
        linesOfStops?: boolean;
        /** parse & expose hints & warnings?
          @default false 
       */
        remarks?: boolean;
        /** fetch & parse previous/next stopovers?
          @default false 
       */
        stopovers?: boolean;
        /** departures at related stations
          @default false 
       */
        includeRelatedStations?: boolean;
        /** language
          @default en 
       */
        language?: string;
    }

    interface RefreshJourneyOptions {
        /** return stations on the way? */
        stopovers?: boolean;
        /** return a shape for each leg? */
        polylines?: boolean;
        /** return tickets? only available with some profiles */
        tickets?: boolean;
        /** parse & expose sub-stops of stations? */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations? */
        entrances?: boolean;
        /** parse & expose hints & warnings? */
        remarks?: boolean;
        language?: string;
    }

    interface NearByOptions {
        /** maximum number of results */
        results?: number;
        /** maximum walking distance in meters */
        distance?: number;
        /** return points of interest? */
        poi?: boolean;
        /** return stops/stations? */
        stops?: boolean;
        /** parse & expose sub-stops of stations? */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations? */
        entrances?: boolean;
        /** parse & expose lines at each stop/station? */
        linesOfStops?: boolean;
        language?: string;
    }

    interface ReachableFromOptions {
        when?: Date;
        /** maximum of transfers */
        maxTransfers?: number;
        /** maximum travel duration in minutes, pass `null` for infinite */
        maxDuration?: number;
        products?: Products;
        /** parse & expose sub-stops of stations? */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations? */
        entrances?: boolean;
    }

    interface HafasClient {
        /**
         * Retrieves journeys
         * @param from uid of station
         * @param to uid of station
         */
        journeys: (from: string | Station | Location, to: string | Station | Location, options: JourneysOptions | undefined) => Promise<Journeys>;
        refreshJourney: (refreshToken: string, options: RefreshJourneyOptions | undefined) => Promise<Journey>;
        trip: (id: string, name: string, options: TripOptions | undefined) => Promise<Trip>;
        /**
         * Retrieves departures
         * @param station uid of station
         */
        departures: (station: string | Station, options: DeparturesArrivalsOptions | undefined) => Promise<ReadonlyArray<Alternative>>;
        arrivals: (station: string | Station, options: DeparturesArrivalsOptions | undefined) => Promise<ReadonlyArray<Alternative>>;
        /**
         * Retrieves locations or stops
         * @param name name of station
         * @param options options for search
         */
        locations: (from: string, options: LocationsOptions | undefined) => Promise<ReadonlyArray<Station | Stop | Location>>;
        stop: (id: string, options: StopOptions | undefined) => Promise<Stop>;
        /**
        * Retrieves nearby stops
        */
        nearby: (location: Location, options: NearByOptions | undefined) => Promise<ReadonlyArray<Stop>>;
        reachableFrom: (address: Location, options: ReachableFromOptions | undefined) => Promise<ReadonlyArray<Duration>>;
    }
}
