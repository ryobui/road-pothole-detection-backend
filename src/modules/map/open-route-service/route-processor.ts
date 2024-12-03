export class RouteProcessor {
    private data: RoutesResponse;

    constructor(json: RoutesResponse) {
        this.data = json;
    }

    getSummary(): { distance: number; duration: number } {
        const route = this.data.routes[0];
        return route.summary;
    }

    getSteps(): Step[] {
        const route = this.data.routes[0];
        return route.segments.flatMap((segment) => segment.steps);
    }

    getRouteGeometry(): string {
        const route = this.data.routes[0];
        return route.geometry;
    }

    getBoundingBox(): number[] {
        return this.data.bbox;
    }

    getAttribution(): string {
        return this.data.metadata.attribution;
    }
}