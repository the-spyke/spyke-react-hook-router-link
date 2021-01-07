/* eslint-disable react/prop-types */

import { render as renderCore } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, jest, test } from "@jest/globals";
import { createMemoryHistory } from "history";
import { Router, Route, Switch, useLocation } from "react-router";

import { useGoBack, useGoTo, useHref, useLinkState } from "./index";

const Home = () => <div>location-home</div>;
const Login = () => <div>location-login</div>;
const Signup = () => <div>location-signup</div>;
const NoMatch = () => <div>location-no-match</div>;

const LocationDisplay = () => {
	const location = useLocation();

	return <div data-testid="location-display">{location.pathname}</div>;
};

const App = ({ children }) => (
	<>
		<Switch>
			<Route path="/" exact><Home /></Route>
			<Route path="/login"><Login /></Route>
			<Route path="/signup"><Signup /></Route>
			<Route><NoMatch /></Route>
		</Switch>
		<LocationDisplay />
		{children}
	</>
);

const Anchor = ({ to }) => <a href={useHref(to)}>Anchor</a>;
const LinkBack = () => <a href="#" onClick={useGoBack()}>Go Back</a>;
const LinkTo = ({ label, replace = false, to }) => <a href="#" onClick={useGoTo(to, replace)}>{label}</a>;

const createWrapper = history =>
	function AppContainer({ children }) {
		return (
			<Router history={history}>
				<App>
					{children}
				</App>
			</Router>
		);
	};

const renderCustom = (ui, { routes = [], ...options } = {}) => {
	const history = createMemoryHistory();

	routes.forEach(r => history.push(r));

	return {
		...renderCore(ui, { wrapper: createWrapper(history), ...options }),
		history,
	};
};

describe("useGoBack", () => {
	test("goes to the previous page", () => {
		const result = renderCustom(
			<LinkBack />,
			{ routes: ["/login", "/signup"] }
		);

		expect(result.getByText(/location-signup/i)).toBeInTheDocument();

		userEvent.click(result.getByText(/go back/i));

		expect(result.getByText(/location-login/i)).toBeInTheDocument();
	});
});

describe("useGoTo", () => {
	test("goes to the specified route", () => {
		const result = renderCustom(
			<LinkTo label="Go Login" to={"/login"} />
		);

		expect(result.getByText(/location-home/i)).toBeInTheDocument();

		userEvent.click(result.getByText(/go login/i));

		expect(result.getByText(/location-login/i)).toBeInTheDocument();
	});

	test("supports history replacement", () => {
		const result = renderCustom(
			<LinkTo label="Go Login" to={"/login"} />
		);

		expect(result.getByText(/location-home/i)).toBeInTheDocument();
		expect(result.history.length).toBe(1);

		userEvent.click(result.getByText(/go login/i));

		expect(result.getByText(/location-login/i)).toBeInTheDocument();
		expect(result.history.length).toBe(2);

		result.rerender(<LinkTo label="Go Login" to={"/signup"} replace />);

		userEvent.click(result.getByText(/go login/i));

		expect(result.getByText(/location-signup/i)).toBeInTheDocument();
		expect(result.history.length).toBe(2);
	});

	test("processes only specific events", () => {
		const result = renderCustom(
			<LinkTo label="Go Login" to={"/login"} />
		);
		const historyIsntChanged = () => {
			expect(result.getByText(/location-home/i)).toBeInTheDocument();
			expect(result.history.length).toBe(1);
		};

		historyIsntChanged();

		userEvent.click(result.getByText(/go login/i), { button: 1 });

		historyIsntChanged();

		userEvent.click(result.getByText(/go login/i), { metaKey: true });

		historyIsntChanged();

		userEvent.click(result.getByText(/go login/i), { altKey: true });

		historyIsntChanged();

		userEvent.click(result.getByText(/go login/i), { ctrlKey: true });

		historyIsntChanged();

		userEvent.click(result.getByText(/go login/i), { shiftKey: true });

		historyIsntChanged();
	});
});

describe("useHref", () => {
	test("normalizes location", () => {
		const result = renderCustom(
			<Anchor to="?asd=qwe" />,
			{ routes: ["/login"] }
		);

		expect(result.getByText(/location-login/i)).toBeInTheDocument();

		expect(result.getByText(/anchor/i)).toHaveAttribute("href", "/login?asd=qwe");
	});

	test("supports a function as an argument", () => {
		const toMock = jest.fn(() => "?asd=qwe");
		const result = renderCustom(
			<Anchor to={toMock} />,
			{ routes: ["/login"] }
		);

		expect(result.getByText(/location-login/i)).toBeInTheDocument();

		expect(result.getByText(/anchor/i)).toHaveAttribute("href", "/login?asd=qwe");
		expect(toMock).toHaveBeenCalledTimes(1);
		expect(toMock).toHaveBeenCalledWith(result.history.location);
	});

	test("supports a location as an argument", () => {
		const result = renderCustom(
			<Anchor to={{ pathname: "/signup", search: "asd=qwe", hash: "zxc" }} />,
			{ routes: ["/login"] }
		);

		expect(result.getByText(/location-login/i)).toBeInTheDocument();

		expect(result.getByText(/anchor/i)).toHaveAttribute("href", "/signup?asd=qwe#zxc");
	});
});

describe("useLinkState", () => {
	test("returns an object with href and onClick props", () => {
		const useLinkStateMock = jest.fn(useLinkState);
		const Link = ({ to }) => <a {...useLinkStateMock(to)}>Link</a>;
		const result = renderCustom(
			<Link to="/signup" />,
			{ routes: ["/login"] }
		);

		expect(result.getByText(/location-login/i)).toBeInTheDocument();

		expect(result.getByText(/link/i)).toHaveAttribute("href", "/signup");
		expect(useLinkStateMock).toHaveBeenCalledTimes(1);
		expect(useLinkStateMock).toHaveReturnedWith({ href: "/signup", onClick: expect.any(Function) });

		userEvent.click(result.getByText(/link/i));

		expect(result.getByText(/location-signup/i)).toBeInTheDocument();
		expect(result.history.length).toBe(3);
	});
});

test("exports are stable", async () => {
	expect(Object.keys(await import("./index")).sort()).toEqual([
		"useGoBack",
		"useGoTo",
		"useHref",
		"useLinkState",
	]);
});
