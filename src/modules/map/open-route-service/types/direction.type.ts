interface Step {
    distance: number;
    duration: number;
    type: number;
    instruction: string;
    name: string;
    way_points: number[];
}

interface Segment {
    distance: number;
    duration: number;
    steps: Step[];
}

interface Route {
    summary: {
        distance: number;
        duration: number;
    };
    segments: Segment[];
    bbox: number[];
    geometry: string;
    way_points: number[];
}

interface RoutesResponse {
    bbox: number[];
    routes: Route[];
    metadata: {
        attribution: string;
        service: string;
        timestamp: number;
        query: {
            coordinates: number[][];
            profile: string;
            format: string;
            geometry_simplify: boolean;
        };
        engine: {
            version: string;
            build_date: string;
            graph_date: string;
        };
    };
}

