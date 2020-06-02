// This file is generated with './scripts/prepare-hafas-types'. Do not modify.



    export interface ProductType {
        id: string;
        mode: string;
        name: string;
        short: string;
    }

    export interface Profile {
        locale: string;
        products: Array<ProductType>;
        trip?: boolean;
        radar?: boolean;
        refreshJourney?: boolean;
        reachableFrom?: boolean;
    }

    export interface Location {
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
    export interface Products {
        [product: string]: boolean;
    }

    export interface Facilities {
        [product: string]: string | boolean;
    }

    export interface ReisezentrumOpeningHours {
        Mo?: string;
        Di?: string;
        Mi?: string;
        Do?: string;
        Fr?: string;
        Sa?: string;
        So?: string;
    }

    export interface Station {
        type: 'station';
        id: string;
        name: string;
        station?: Station;
        location?: Location;
        products?: Products;
        isMeta?: boolean;
        /** region ids */
        regions?: Array<string>;
        facilities?: Facilities;
        reisezentrumOpeningHours?: ReisezentrumOpeningHours;
    }

    export interface IDs {
        /** DELFI Haltestellen ID */
        dhid?: string;
    }

    export interface Stop {
        type: 'stop';
        id: string;
        name: string;
        station?: Station;
        location?: Location;
        products: Products;
        lines?: Array<Line>;
        isMeta?: boolean;
        reisezentrumOpeningHours?: ReisezentrumOpeningHours;
        ids?: IDs;
        loadFactor?: string;
    }

    export interface Region {
        type: 'region';
        id: string;
        name: string;
        /** station ids */
        stations: Array<string>;
    }

    export interface Line {
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
        routes?: Array<string>;
        operator?: Operator;
        express?: boolean;
        metro?: boolean;
        night?: boolean;
        nr?: number;
        symbol?: string;
    }

    export interface Route {
        type: 'route';
        id: string;
        line: string;
        mode: 'train' | 'bus' | 'watercraft' | 'taxi' | 'gondola' | 'aircraft' | 'car' | 'bicycle' | 'walking';
        /** stop ids */
        stops: Array<string>;
    }

    export interface Cycle {
        min?: number;
        max?: number;
        nr?: number;
    }

    export interface ArrivalDeparture {
        arrival?: number;
        departure?: number;
    }

    export interface Schedule {
        type: 'schedule';
        id: string;
        route: string;
        mode: 'train' | 'bus' | 'watercraft' | 'taxi' | 'gondola' | 'aircraft' | 'car' | 'bicycle' | 'walking';
        sequence: Array<ArrivalDeparture>;
        /** array of Unix timestamps */
        starts: Array<string>;
    }

    export interface Operator {
        type: 'operator';
        id: string;
        name: string;
    }

    export interface Hint {
        type: 'hint';
        code?: string;
        summary?: string;
        text: string;
        tripId?: string;
    }

    export interface Geometry {
        type: 'point';
        coordinates: number[];
    }

    export interface Feature {
        type: 'Feature';
        properties?: Station | Stop;
        geometry: Geometry;
    }

    export interface FeatureCollection {
        type: 'FeatureCollection';
        features: Array<Feature>;
    }

    export interface StopOver {
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
        remarks?: Array<Hint>;
    }

    export interface Trip {
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
        stopovers: Array<StopOver>;
        remarks?: Array<Hint>;
        line?: Line;
        direction?: string;
        reachable?: boolean;
        polyline?: FeatureCollection;
    }

    export interface Price {
        amount: number;
        currency: string;
        hint?: string;
    }

    export interface Alternative {
        tripId: string;
        direction?: string;
        line?: Line;
        stop?: Station | Stop;
        plannedWhen?: string;
        when?: string;
        delay?: number;
        platform?: string;
        plannedPlatform?: string;
        remarks?: Array<Hint>;
        cancelled?: boolean;
        loadFactor?: string;
    }

    export interface Leg {
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
        stopovers?: Array<StopOver>;
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
        alternatives?: Array<Alternative>;
        polyline?: FeatureCollection;
        remarks?: Array<Hint>;
    }

    export interface ScheduledDays {
        [day: string]: boolean;
    }

    export interface Journey {
        type: 'journey';
        legs: Array<Leg>;
        refreshToken?: string;
        remarks?: Array<Hint>;
        price?: Price;
        cycle?: Cycle;
        scheduledDays?: ScheduledDays;
    }

    export interface Journeys {
        earlierRef?: string;
        laterRef?: string;
        journeys: Array<Journey>;
    }

    export interface Duration {
        duration: number;
        stations: Array<Station | Stop>;
    }

    export interface JourneysOptions {
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
        /** parse & expose sub-stops of stations?
            @default false
         */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations?
            @default true
         */
        entrances?: boolean;
        /** parse & expose hints & warnings? 
            @default true
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

    export interface LocationsOptions {
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

    export interface TripOptions {
        /** return stations on the way?
            @default true
         */
        stopovers?: boolean;
        /** return a shape for the trip? 
            @default false
        */
        polyline?: boolean;
        /** parse & expose sub-stops of stations?
             @default true
         */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations?
            @default true
         */
        entrances?: boolean;
        /** parse & expose hints & warnings?
            @default true
         */
        remarks?: boolean;
        /** Language of the results
         *  @default en
        */
        language?: string;
    }

    export interface StopOptions {
        /** parse & expose lines at the stop/station?
            @default false
         */
        linesOfStops?: boolean;
        /** parse & expose sub-stops of stations? 
            @default true
        */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations?
            @default true
         */
        entrances?: boolean;
        /** Language of the results
         *  @default en
        */
        language?: string;
    }

    export interface DeparturesArrivalsOptions {
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
        /** parse & expose sub-stops of stations?
            @default true
         */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations?
            @default true
         */
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

    export interface RefreshJourneyOptions {
        /** return stations on the way?
            @default false
         */
        stopovers?: boolean;
        /** return a shape for each leg?
            @default false
         */
        polylines?: boolean;
        /** return tickets? only available with some profiles
            @default false
         */
        tickets?: boolean;
        /** parse & expose sub-stops of stations?
            @default true
         */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations?
            @default true
         */
        entrances?: boolean;
        /** parse & expose hints & warnings?
            @default true
         */
        remarks?: boolean;
        /** language
            @default en 
        */
        language?: string;
    }

    export interface NearByOptions {
        /** maximum number of results
            @default 8 
         */
        results?: number;
        /** maximum walking distance in meters
            @default undefined
         */
        distance?: number;
        /** return points of interest? 
            @default false
        */
        poi?: boolean;
        /** return stops/stations?
            @default true
         */
        stops?: boolean;
        /** parse & expose sub-stops of stations?
            @default true
         */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations?
            @default true
         */
        entrances?: boolean;
        /** parse & expose lines at each stop/station? 
            @default false
        */
        linesOfStops?: boolean;
        /** language
          @default en 
         */
        language?: string;
    }

    export interface ReachableFromOptions {
        /** when
            @default undefined
         */
        when?: Date;
        /** maximum of transfers
            @default 5
         */
        maxTransfers?: number;
        /** maximum travel duration in minutes, pass `null` for infinite
            @default 20
         */
        maxDuration?: number;
        /** products
            @default undefined
         */
        products?: Products;
        /** parse & expose sub-stops of stations? 
            @default true
        */
        subStops?: boolean;
        /** parse & expose entrances of stops/stations?
            @default true
         */
        entrances?: boolean;
    }

    export interface HafasClient {
        /**
         * Retrieves journeys
         * @param from uid of station
         * @param to uid of station
         * @param options options
         */
        journeys: (from: string | Station | Location, to: string | Station | Location, options: JourneysOptions | undefined) => Promise<Journeys>;
        /**
         * refreshes a Journey
         * @param refreshToken refreshToken must be a string, taken from {@link journey#refreshToken}
         * @param options options
         */
        refreshJourney: (refreshToken: string, options: RefreshJourneyOptions | undefined) => Promise<Journey>;
        /**
         * Refetch information about a trip
         * @param id trip id, see {@link Leg#tripId}
         * @param options options
         */
        trip: (id: string, name: string, options: TripOptions | undefined) => Promise<Trip>;
        /**
         * Retrieves departures
         * @param station uid of station
         * @param options options
         */
        departures: (station: string | Station, options: DeparturesArrivalsOptions | undefined) => Promise<Array<Alternative>>;
        /**
         * Retrieves arrivals
         * @param station uid of station
         * @param options options
         */
        arrivals: (station: string | Station, options: DeparturesArrivalsOptions | undefined) => Promise<Array<Alternative>>;
        /**
         * Retrieves locations or stops
         * @param name name of station
         * @param options options for search
         */
        locations: (name: string, options: LocationsOptions | undefined) => Promise<Array<Station | Stop | Location>>;
        /**
        * Retrieves information about a stop
        * @param id uid of station
        * @param options options for search
        */
        stop: (id: string, options: StopOptions | undefined) => Promise<Stop>;
        /**
        * Retrieves nearby stops from location
        * @param location location
        * @param options options for search
        */
        nearby: (location: Location, options: NearByOptions | undefined) => Promise<Array<Stop>>;
        /**
        * Retrieves stations reachable within a certain time from a location
        * @param address location
        * @param options options for search
        */
        reachableFrom: (address: Location, options: ReachableFromOptions | undefined) => Promise<Array<Duration>>;
    }
