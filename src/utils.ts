import { createLocation, Location, LocationDescriptor, LocationDescriptorObject } from "history";
import { MouseEvent } from "react";

export function isModifiedEvent(event: MouseEvent) {
	return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

export function resolveToLocation<S>(to: LocationDescriptor<S> | (<S>(currentLocation: Location<S>) => LocationDescriptor<S>), currentLocation: Location<S>): LocationDescriptor<S> {
	return typeof to === "function" ? to(currentLocation) : to;
}

export function normalizeToLocation<S>(targetLocation: LocationDescriptor<S>, currentLocation: Location<S>): LocationDescriptorObject<S> {
	return typeof targetLocation === "string"
		? createLocation(targetLocation, undefined, undefined, currentLocation)
		: targetLocation;
}
