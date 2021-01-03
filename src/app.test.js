import { render } from "@testing-library/react";
import { expect, test } from "@jest/globals";
import { MemoryRouter } from "react-router";

import { useGoBack } from "./index";

test("renders learn react link", () => {
	const { getByText } = render(
		<MemoryRouter>
			<a href="#" onClick={useGoBack()} />
		</MemoryRouter>
	);
	const linkElement = getByText(/Login/i);

	expect(linkElement).toBeInTheDocument();
});
