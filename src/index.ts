import { LocationDescriptor } from "history";
import { MouseEvent, MouseEventHandler, useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import {
	isModifiedEvent,
	normalizeToLocation,
	resolveToLocation,
} from "./utils";

/**
 * Creates a handler for "onclick" event that will go back in browser history by 1 record.
*/
export function useGoBack(): MouseEventHandler {
	const history = useHistory();

	return useCallback(() => history.goBack(), [history]);
}

export function useGoTo<S>(to: LocationDescriptor<S>, replace = false): MouseEventHandler {
	const history = useHistory();
	const location = useLocation();

	const resolvedLocation = resolveToLocation(to, location);
	const goTo = replace ? history.replace : history.push;

	return useCallback((event: MouseEvent): void => {
		if (
			!event.defaultPrevented && // onClick prevented default
			event.button === 0 && // ignore everything but left clicks
			// Instead of looking on the target dotn't use the hook for external links.
			// (!target || target === "_self") && // let browser handle "target=_blank" etc.
			!isModifiedEvent(event) // ignore clicks with modifier keys
		) {
			event.preventDefault();

			goTo(resolvedLocation);
		}
	}, [resolvedLocation, goTo]);
}

export function useHref<S>(to: LocationDescriptor<S>) {
	const history = useHistory();
	const location = useLocation();

	const resolvedLocation = resolveToLocation(to, location);
	const normalizedLocation = normalizeToLocation(resolvedLocation, location);

	return normalizedLocation ? history.createHref(normalizedLocation) : "";
}

export function useLinkState<S>(to: LocationDescriptor<S>, replace = false) {
	return {
		href: useHref(to),
		onClick: useGoTo(to, replace),
	};
}
