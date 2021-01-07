import { expect, afterEach } from "@jest/globals";
import * as extensions from "@testing-library/jest-dom/dist/matchers.js";
import { cleanup } from "@testing-library/react";

expect.extend(extensions);

afterEach(cleanup);
