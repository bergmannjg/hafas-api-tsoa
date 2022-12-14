/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { HafasController } from './hafas/hafasController.js';
import type { RequestHandler } from 'express';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Station": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["station"],"required":true},
            "id": {"dataType":"string"},
            "name": {"dataType":"string"},
            "station": {"ref":"Station"},
            "location": {"ref":"Location"},
            "products": {"ref":"Products"},
            "lines": {"dataType":"array","array":{"dataType":"refObject","ref":"Line"}},
            "isMeta": {"dataType":"boolean"},
            "regions": {"dataType":"array","array":{"dataType":"string"}},
            "facilities": {"ref":"Facilities"},
            "reisezentrumOpeningHours": {"ref":"ReisezentrumOpeningHours"},
            "stops": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]}},
            "entrances": {"dataType":"array","array":{"dataType":"refObject","ref":"Location"}},
            "transitAuthority": {"dataType":"string"},
            "distance": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Location": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["location"],"required":true},
            "id": {"dataType":"string"},
            "name": {"dataType":"string"},
            "poi": {"dataType":"boolean"},
            "address": {"dataType":"string"},
            "longitude": {"dataType":"double"},
            "latitude": {"dataType":"double"},
            "altitude": {"dataType":"double"},
            "distance": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Products": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"boolean"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Operator": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["operator"],"required":true},
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Line": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["line"],"required":true},
            "id": {"dataType":"string"},
            "name": {"dataType":"string"},
            "adminCode": {"dataType":"string"},
            "fahrtNr": {"dataType":"string"},
            "additionalName": {"dataType":"string"},
            "product": {"dataType":"string"},
            "public": {"dataType":"boolean"},
            "mode": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["train"]},{"dataType":"enum","enums":["bus"]},{"dataType":"enum","enums":["watercraft"]},{"dataType":"enum","enums":["taxi"]},{"dataType":"enum","enums":["gondola"]},{"dataType":"enum","enums":["aircraft"]},{"dataType":"enum","enums":["car"]},{"dataType":"enum","enums":["bicycle"]},{"dataType":"enum","enums":["walking"]}]},
            "routes": {"dataType":"array","array":{"dataType":"string"}},
            "operator": {"ref":"Operator"},
            "express": {"dataType":"boolean"},
            "metro": {"dataType":"boolean"},
            "night": {"dataType":"boolean"},
            "nr": {"dataType":"double"},
            "symbol": {"dataType":"string"},
            "directions": {"dataType":"array","array":{"dataType":"string"}},
            "productName": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Facilities": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"boolean"}]},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReisezentrumOpeningHours": {
        "dataType": "refObject",
        "properties": {
            "Mo": {"dataType":"string"},
            "Di": {"dataType":"string"},
            "Mi": {"dataType":"string"},
            "Do": {"dataType":"string"},
            "Fr": {"dataType":"string"},
            "Sa": {"dataType":"string"},
            "So": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Ids": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"string"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Stop": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["stop"],"required":true},
            "id": {"dataType":"string"},
            "name": {"dataType":"string"},
            "location": {"ref":"Location"},
            "station": {"ref":"Station"},
            "products": {"ref":"Products"},
            "lines": {"dataType":"array","array":{"dataType":"refObject","ref":"Line"}},
            "isMeta": {"dataType":"boolean"},
            "reisezentrumOpeningHours": {"ref":"ReisezentrumOpeningHours"},
            "ids": {"ref":"Ids"},
            "loadFactor": {"dataType":"string"},
            "entrances": {"dataType":"array","array":{"dataType":"refObject","ref":"Location"}},
            "transitAuthority": {"dataType":"string"},
            "distance": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Hint": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["hint"]},{"dataType":"enum","enums":["status"]},{"dataType":"enum","enums":["foreign-id"]},{"dataType":"enum","enums":["local-fare-zone"]},{"dataType":"enum","enums":["stop-website"]},{"dataType":"enum","enums":["stop-dhid"]},{"dataType":"enum","enums":["transit-authority"]}],"required":true},
            "code": {"dataType":"string"},
            "summary": {"dataType":"string"},
            "text": {"dataType":"string","required":true},
            "tripId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Status": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["hint"]},{"dataType":"enum","enums":["status"]},{"dataType":"enum","enums":["foreign-id"]},{"dataType":"enum","enums":["local-fare-zone"]},{"dataType":"enum","enums":["stop-website"]},{"dataType":"enum","enums":["stop-dhid"]},{"dataType":"enum","enums":["transit-authority"]}],"required":true},
            "code": {"dataType":"string"},
            "summary": {"dataType":"string"},
            "text": {"dataType":"string","required":true},
            "tripId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IcoCrd": {
        "dataType": "refObject",
        "properties": {
            "x": {"dataType":"double","required":true},
            "y": {"dataType":"double","required":true},
            "type": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Edge": {
        "dataType": "refObject",
        "properties": {
            "fromLocation": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "toLocation": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "icon": {"dataType":"object"},
            "dir": {"dataType":"double"},
            "icoCrd": {"ref":"IcoCrd"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Event": {
        "dataType": "refObject",
        "properties": {
            "fromLocation": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "toLocation": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "start": {"dataType":"string"},
            "end": {"dataType":"string"},
            "sections": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Warning": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["status"]},{"dataType":"enum","enums":["warning"]}],"required":true},
            "id": {"dataType":"string"},
            "icon": {"dataType":"object"},
            "summary": {"dataType":"string"},
            "text": {"dataType":"string"},
            "category": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},
            "priority": {"dataType":"double"},
            "products": {"ref":"Products"},
            "edges": {"dataType":"array","array":{"dataType":"refObject","ref":"Edge"}},
            "events": {"dataType":"array","array":{"dataType":"refObject","ref":"Event"}},
            "validFrom": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},
            "validUntil": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},
            "modified": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},
            "company": {"dataType":"string"},
            "categories": {"dataType":"array","array":{"dataType":"double"}},
            "affectedLines": {"dataType":"array","array":{"dataType":"refObject","ref":"Line"}},
            "fromStops": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]}},
            "toStops": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PrognosisType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["prognosed"]},{"dataType":"enum","enums":["calculated"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StopOver": {
        "dataType": "refObject",
        "properties": {
            "stop": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"}]},
            "departure": {"dataType":"string"},
            "departureDelay": {"dataType":"double"},
            "prognosedDeparture": {"dataType":"string"},
            "plannedDeparture": {"dataType":"string"},
            "departurePlatform": {"dataType":"string"},
            "prognosedDeparturePlatform": {"dataType":"string"},
            "plannedDeparturePlatform": {"dataType":"string"},
            "arrival": {"dataType":"string"},
            "arrivalDelay": {"dataType":"double"},
            "prognosedArrival": {"dataType":"string"},
            "plannedArrival": {"dataType":"string"},
            "arrivalPlatform": {"dataType":"string"},
            "prognosedArrivalPlatform": {"dataType":"string"},
            "plannedArrivalPlatform": {"dataType":"string"},
            "remarks": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Hint"},{"ref":"Status"},{"ref":"Warning"}]}},
            "passBy": {"dataType":"boolean"},
            "cancelled": {"dataType":"boolean"},
            "departurePrognosisType": {"ref":"PrognosisType"},
            "arrivalPrognosisType": {"ref":"PrognosisType"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Price": {
        "dataType": "refObject",
        "properties": {
            "amount": {"dataType":"double","required":true},
            "currency": {"dataType":"string","required":true},
            "hint": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Cycle": {
        "dataType": "refObject",
        "properties": {
            "min": {"dataType":"double"},
            "max": {"dataType":"double"},
            "nr": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Frame": {
        "dataType": "refObject",
        "properties": {
            "origin": {"dataType":"union","subSchemas":[{"ref":"Stop"},{"ref":"Location"}],"required":true},
            "destination": {"dataType":"union","subSchemas":[{"ref":"Stop"},{"ref":"Location"}],"required":true},
            "t": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Geometry": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["Point"],"required":true},
            "coordinates": {"dataType":"array","array":{"dataType":"double"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Feature": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["Feature"],"required":true},
            "properties": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"},{"dataType":"nestedObjectLiteral","nestedProperties":{}}],"required":true},
            "geometry": {"ref":"Geometry","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FeatureCollection": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["FeatureCollection"],"required":true},
            "features": {"dataType":"array","array":{"dataType":"refObject","ref":"Feature"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Alternative": {
        "dataType": "refObject",
        "properties": {
            "tripId": {"dataType":"string","required":true},
            "direction": {"dataType":"string"},
            "location": {"ref":"Location"},
            "line": {"ref":"Line"},
            "stop": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"}]},
            "when": {"dataType":"string"},
            "plannedWhen": {"dataType":"string"},
            "prognosedWhen": {"dataType":"string"},
            "delay": {"dataType":"double"},
            "platform": {"dataType":"string"},
            "plannedPlatform": {"dataType":"string"},
            "prognosedPlatform": {"dataType":"string"},
            "remarks": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Hint"},{"ref":"Status"},{"ref":"Warning"}]}},
            "cancelled": {"dataType":"boolean"},
            "loadFactor": {"dataType":"string"},
            "provenance": {"dataType":"string"},
            "previousStopovers": {"dataType":"array","array":{"dataType":"refObject","ref":"StopOver"}},
            "nextStopovers": {"dataType":"array","array":{"dataType":"refObject","ref":"StopOver"}},
            "frames": {"dataType":"array","array":{"dataType":"refObject","ref":"Frame"}},
            "polyline": {"ref":"FeatureCollection"},
            "currentTripPosition": {"ref":"Location"},
            "origin": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "destination": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "prognosisType": {"ref":"PrognosisType"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Leg": {
        "dataType": "refObject",
        "properties": {
            "tripId": {"dataType":"string"},
            "origin": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "destination": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "departure": {"dataType":"string"},
            "plannedDeparture": {"dataType":"string"},
            "prognosedArrival": {"dataType":"string"},
            "departureDelay": {"dataType":"double"},
            "departurePlatform": {"dataType":"string"},
            "prognosedDeparturePlatform": {"dataType":"string"},
            "plannedDeparturePlatform": {"dataType":"string"},
            "arrival": {"dataType":"string"},
            "plannedArrival": {"dataType":"string"},
            "prognosedDeparture": {"dataType":"string"},
            "arrivalDelay": {"dataType":"double"},
            "arrivalPlatform": {"dataType":"string"},
            "prognosedArrivalPlatform": {"dataType":"string"},
            "plannedArrivalPlatform": {"dataType":"string"},
            "stopovers": {"dataType":"array","array":{"dataType":"refObject","ref":"StopOver"}},
            "schedule": {"dataType":"double"},
            "price": {"ref":"Price"},
            "operator": {"dataType":"double"},
            "direction": {"dataType":"string"},
            "line": {"ref":"Line"},
            "reachable": {"dataType":"boolean"},
            "cancelled": {"dataType":"boolean"},
            "walking": {"dataType":"boolean"},
            "loadFactor": {"dataType":"string"},
            "distance": {"dataType":"double"},
            "public": {"dataType":"boolean"},
            "transfer": {"dataType":"boolean"},
            "cycle": {"ref":"Cycle"},
            "alternatives": {"dataType":"array","array":{"dataType":"refObject","ref":"Alternative"}},
            "polyline": {"ref":"FeatureCollection"},
            "remarks": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Hint"},{"ref":"Status"},{"ref":"Warning"}]}},
            "currentLocation": {"ref":"Location"},
            "departurePrognosisType": {"ref":"PrognosisType"},
            "arrivalPrognosisType": {"ref":"PrognosisType"},
            "checkin": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ScheduledDays": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"dataType":"boolean"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Journey": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"enum","enums":["journey"],"required":true},
            "legs": {"dataType":"array","array":{"dataType":"refObject","ref":"Leg"},"required":true},
            "refreshToken": {"dataType":"string"},
            "remarks": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Hint"},{"ref":"Status"},{"ref":"Warning"}]}},
            "price": {"ref":"Price"},
            "cycle": {"ref":"Cycle"},
            "scheduledDays": {"ref":"ScheduledDays"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Journeys": {
        "dataType": "refObject",
        "properties": {
            "realtimeDataUpdatedAt": {"dataType":"double"},
            "earlierRef": {"dataType":"string"},
            "laterRef": {"dataType":"string"},
            "journeys": {"dataType":"array","array":{"dataType":"refObject","ref":"Journey"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Trip": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "origin": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "destination": {"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},
            "departure": {"dataType":"string"},
            "plannedDeparture": {"dataType":"string"},
            "prognosedArrival": {"dataType":"string"},
            "departureDelay": {"dataType":"double"},
            "departurePlatform": {"dataType":"string"},
            "prognosedDeparturePlatform": {"dataType":"string"},
            "plannedDeparturePlatform": {"dataType":"string"},
            "arrival": {"dataType":"string"},
            "plannedArrival": {"dataType":"string"},
            "prognosedDeparture": {"dataType":"string"},
            "arrivalDelay": {"dataType":"double"},
            "arrivalPlatform": {"dataType":"string"},
            "prognosedArrivalPlatform": {"dataType":"string"},
            "plannedArrivalPlatform": {"dataType":"string"},
            "stopovers": {"dataType":"array","array":{"dataType":"refObject","ref":"StopOver"}},
            "schedule": {"dataType":"double"},
            "price": {"ref":"Price"},
            "operator": {"dataType":"double"},
            "direction": {"dataType":"string"},
            "line": {"ref":"Line"},
            "reachable": {"dataType":"boolean"},
            "cancelled": {"dataType":"boolean"},
            "walking": {"dataType":"boolean"},
            "loadFactor": {"dataType":"string"},
            "distance": {"dataType":"double"},
            "public": {"dataType":"boolean"},
            "transfer": {"dataType":"boolean"},
            "cycle": {"ref":"Cycle"},
            "alternatives": {"dataType":"array","array":{"dataType":"refObject","ref":"Alternative"}},
            "polyline": {"ref":"FeatureCollection"},
            "remarks": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Hint"},{"ref":"Status"},{"ref":"Warning"}]}},
            "scheduledDays": {"ref":"ScheduledDays"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TripWithRealtimeData": {
        "dataType": "refObject",
        "properties": {
            "realtimeDataUpdatedAt": {"dataType":"double"},
            "trip": {"ref":"Trip","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Departures": {
        "dataType": "refObject",
        "properties": {
            "realtimeDataUpdatedAt": {"dataType":"double"},
            "departures": {"dataType":"array","array":{"dataType":"refObject","ref":"Alternative"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Duration": {
        "dataType": "refObject",
        "properties": {
            "duration": {"dataType":"double","required":true},
            "stations": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"Station"},{"ref":"Stop"},{"ref":"Location"}]},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DurationsWithRealtimeData": {
        "dataType": "refObject",
        "properties": {
            "realtimeDataUpdatedAt": {"dataType":"double"},
            "reachable": {"dataType":"array","array":{"dataType":"refObject","ref":"Duration"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Movement": {
        "dataType": "refObject",
        "properties": {
            "direction": {"dataType":"string"},
            "tripId": {"dataType":"string"},
            "line": {"ref":"Line"},
            "location": {"ref":"Location"},
            "nextStopovers": {"dataType":"array","array":{"dataType":"refObject","ref":"StopOver"}},
            "frames": {"dataType":"array","array":{"dataType":"refObject","ref":"Frame"}},
            "polyline": {"ref":"FeatureCollection"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/hafas/journeys',
            ...(fetchMiddlewares<RequestHandler>(HafasController)),
            ...(fetchMiddlewares<RequestHandler>(HafasController.prototype.getjourneys)),

            function HafasController_getjourneys(request: any, response: any, next: any) {
            const args = {
                    from: {"in":"query","name":"from","required":true,"dataType":"string"},
                    to: {"in":"query","name":"to","required":true,"dataType":"string"},
                    departure: {"in":"query","name":"departure","dataType":"any"},
                    results: {"default":3,"in":"query","name":"results","dataType":"double"},
                    via: {"in":"query","name":"via","dataType":"any"},
                    stopovers: {"default":false,"in":"query","name":"stopovers","dataType":"boolean"},
                    transfers: {"default":10,"in":"query","name":"transfers","dataType":"double"},
                    transferTime: {"default":10,"in":"query","name":"transferTime","dataType":"double"},
                    accessibility: {"default":"none","in":"query","name":"accessibility","dataType":"string"},
                    bike: {"default":false,"in":"query","name":"bike","dataType":"boolean"},
                    tickets: {"default":false,"in":"query","name":"tickets","dataType":"boolean"},
                    polylines: {"default":false,"in":"query","name":"polylines","dataType":"boolean"},
                    subStops: {"default":false,"in":"query","name":"subStops","dataType":"boolean"},
                    entrances: {"default":true,"in":"query","name":"entrances","dataType":"boolean"},
                    remarks: {"default":true,"in":"query","name":"remarks","dataType":"boolean"},
                    walkingSpeed: {"default":"slow","in":"query","name":"walkingSpeed","dataType":"string"},
                    startWithWalking: {"default":false,"in":"query","name":"startWithWalking","dataType":"boolean"},
                    language: {"default":"en","in":"query","name":"language","dataType":"string"},
                    scheduledDays: {"default":false,"in":"query","name":"scheduledDays","dataType":"boolean"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new HafasController();


              const promise = controller.getjourneys.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/hafas/trip',
            ...(fetchMiddlewares<RequestHandler>(HafasController)),
            ...(fetchMiddlewares<RequestHandler>(HafasController.prototype.gettrip)),

            function HafasController_gettrip(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"query","name":"id","required":true,"dataType":"string"},
                    stopovers: {"default":true,"in":"query","name":"stopovers","dataType":"boolean"},
                    polyline: {"default":false,"in":"query","name":"polyline","dataType":"boolean"},
                    subStops: {"default":true,"in":"query","name":"subStops","dataType":"boolean"},
                    entrances: {"default":true,"in":"query","name":"entrances","dataType":"boolean"},
                    remarks: {"default":true,"in":"query","name":"remarks","dataType":"boolean"},
                    language: {"default":"en","in":"query","name":"language","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new HafasController();


              const promise = controller.gettrip.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/hafas/departures',
            ...(fetchMiddlewares<RequestHandler>(HafasController)),
            ...(fetchMiddlewares<RequestHandler>(HafasController.prototype.getdepartures)),

            function HafasController_getdepartures(request: any, response: any, next: any) {
            const args = {
                    station: {"in":"query","name":"station","required":true,"dataType":"string"},
                    when: {"in":"query","name":"when","dataType":"any"},
                    direction: {"in":"query","name":"direction","dataType":"any"},
                    duration: {"default":120,"in":"query","name":"duration","dataType":"double"},
                    results: {"default":10,"in":"query","name":"results","dataType":"double"},
                    subStops: {"default":true,"in":"query","name":"subStops","dataType":"boolean"},
                    entrances: {"default":true,"in":"query","name":"entrances","dataType":"boolean"},
                    linesOfStops: {"default":false,"in":"query","name":"linesOfStops","dataType":"boolean"},
                    remarks: {"default":false,"in":"query","name":"remarks","dataType":"boolean"},
                    stopovers: {"default":false,"in":"query","name":"stopovers","dataType":"boolean"},
                    includeRelatedStations: {"default":false,"in":"query","name":"includeRelatedStations","dataType":"boolean"},
                    language: {"default":"en","in":"query","name":"language","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new HafasController();


              const promise = controller.getdepartures.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/hafas/locations',
            ...(fetchMiddlewares<RequestHandler>(HafasController)),
            ...(fetchMiddlewares<RequestHandler>(HafasController.prototype.getlocations)),

            function HafasController_getlocations(request: any, response: any, next: any) {
            const args = {
                    name: {"in":"query","name":"name","required":true,"dataType":"string"},
                    fuzzy: {"default":true,"in":"query","name":"fuzzy","dataType":"boolean"},
                    results: {"default":10,"in":"query","name":"results","dataType":"double"},
                    stops: {"default":true,"in":"query","name":"stops","dataType":"boolean"},
                    addresses: {"default":false,"in":"query","name":"addresses","dataType":"boolean"},
                    poi: {"default":true,"in":"query","name":"poi","dataType":"boolean"},
                    subStops: {"default":false,"in":"query","name":"subStops","dataType":"boolean"},
                    entrances: {"default":true,"in":"query","name":"entrances","dataType":"boolean"},
                    linesOfStops: {"default":false,"in":"query","name":"linesOfStops","dataType":"boolean"},
                    language: {"default":"en","in":"query","name":"language","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new HafasController();


              const promise = controller.getlocations.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/hafas/stop',
            ...(fetchMiddlewares<RequestHandler>(HafasController)),
            ...(fetchMiddlewares<RequestHandler>(HafasController.prototype.getstop)),

            function HafasController_getstop(request: any, response: any, next: any) {
            const args = {
                    id: {"in":"query","name":"id","required":true,"dataType":"string"},
                    linesOfStops: {"default":false,"in":"query","name":"linesOfStops","dataType":"boolean"},
                    subStops: {"default":true,"in":"query","name":"subStops","dataType":"boolean"},
                    entrances: {"default":true,"in":"query","name":"entrances","dataType":"boolean"},
                    remarks: {"default":true,"in":"query","name":"remarks","dataType":"boolean"},
                    language: {"default":"en","in":"query","name":"language","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new HafasController();


              const promise = controller.getstop.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/hafas/nearby',
            ...(fetchMiddlewares<RequestHandler>(HafasController)),
            ...(fetchMiddlewares<RequestHandler>(HafasController.prototype.getnearby)),

            function HafasController_getnearby(request: any, response: any, next: any) {
            const args = {
                    longitude: {"in":"query","name":"longitude","required":true,"dataType":"double"},
                    latitude: {"in":"query","name":"latitude","required":true,"dataType":"double"},
                    results: {"default":8,"in":"query","name":"results","dataType":"double"},
                    distance: {"in":"query","name":"distance","dataType":"any"},
                    poi: {"default":false,"in":"query","name":"poi","dataType":"boolean"},
                    stops: {"default":true,"in":"query","name":"stops","dataType":"boolean"},
                    subStops: {"default":true,"in":"query","name":"subStops","dataType":"boolean"},
                    entrances: {"default":true,"in":"query","name":"entrances","dataType":"boolean"},
                    linesOfStops: {"default":false,"in":"query","name":"linesOfStops","dataType":"boolean"},
                    language: {"default":"en","in":"query","name":"language","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new HafasController();


              const promise = controller.getnearby.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/hafas/reachableFrom',
            ...(fetchMiddlewares<RequestHandler>(HafasController)),
            ...(fetchMiddlewares<RequestHandler>(HafasController.prototype.getreachableFrom)),

            function HafasController_getreachableFrom(request: any, response: any, next: any) {
            const args = {
                    address: {"in":"query","name":"address","required":true,"dataType":"string"},
                    longitude: {"in":"query","name":"longitude","required":true,"dataType":"double"},
                    latitude: {"in":"query","name":"latitude","required":true,"dataType":"double"},
                    distance: {"in":"query","name":"distance","required":true,"dataType":"double"},
                    maxTransfers: {"default":5,"in":"query","name":"maxTransfers","dataType":"double"},
                    maxDuration: {"default":20,"in":"query","name":"maxDuration","dataType":"double"},
                    subStops: {"default":true,"in":"query","name":"subStops","dataType":"boolean"},
                    entrances: {"default":true,"in":"query","name":"entrances","dataType":"boolean"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new HafasController();


              const promise = controller.getreachableFrom.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/hafas/radar',
            ...(fetchMiddlewares<RequestHandler>(HafasController)),
            ...(fetchMiddlewares<RequestHandler>(HafasController.prototype.getradar)),

            function HafasController_getradar(request: any, response: any, next: any) {
            const args = {
                    north: {"in":"query","name":"north","required":true,"dataType":"double"},
                    west: {"in":"query","name":"west","required":true,"dataType":"double"},
                    south: {"in":"query","name":"south","required":true,"dataType":"double"},
                    east: {"in":"query","name":"east","required":true,"dataType":"double"},
                    results: {"default":256,"in":"query","name":"results","dataType":"double"},
                    frames: {"default":3,"in":"query","name":"frames","dataType":"double"},
                    duration: {"default":20,"in":"query","name":"duration","dataType":"double"},
                    subStops: {"default":true,"in":"query","name":"subStops","dataType":"boolean"},
                    entrances: {"default":true,"in":"query","name":"entrances","dataType":"boolean"},
                    polylines: {"default":false,"in":"query","name":"polylines","dataType":"boolean"},
                    when: {"in":"query","name":"when","dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new HafasController();


              const promise = controller.getradar.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
