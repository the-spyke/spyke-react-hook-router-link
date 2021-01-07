# @spyke/react-hook-router-link

[![downloads](https://img.shields.io/npm/dm/@spyke/react-hook-router-link)](https://www.npmjs.com/package/@spyke/react-hook-router-link)
[![ci](https://github.com/the-spyke/spyke-react-hook-router-link/workflows/CI/badge.svg)](https://github.com/the-spyke/spyke-react-hook-router-link/actions?query=workflow%3ACI)
[![rms](https://img.shields.io/badge/RMS-0.3.0-blue)](https://github.com/the-spyke/rms)
[![license](https://img.shields.io/npm/l/spyke/react-hook-router-link.svg)](https://github.com/the-spyke/spyke-react-hook-router-link/blob/master/LICENSE)

An extract from the `react-router`'s [Link](https://reactrouter.com/web/api/Link) logic for easier integration with 3rd party UI libraries.

If you're using a UI library and want to render a link, at first you may come up with this:

```js
<Anchor label="MyApp" icon={Icons.Home} as={Link} to="/home" />
```

The issue with this approach may be that you will lose support for the `icon` (Link know nothing about how to render it) and start getting [warnings](https://github.com/grommet/grommet/issues/2855#issuecomment-469430953) for excess props.

Another approach would be to make a custom component or a HoC, but in both cases you get a more nested React tree and a lot of code.

Hooks solve excess nesting, so there you have a couple of hooks with [extracted logic](https://github.com/ReactTraining/react-router/issues/7390) from `react-router`'s `Link` component to apply to your own components to make them behave the same way.

## Installation

```sh
npm install @spyke/react-hook-router-link
# or
yarn add @spyke/react-hook-router-link
```

## Usage

`useLinkState` gives you `{ href, onClick }` props for your anchors and links:

```js
import { useLinkState } from "@spyke/react-hook-router-link";

const { href, onClick } = useLinkState("/login");

<a href={href} onClick={onClick}>Login</a>

// or simply

<Anchor label="Login" {...useLinkState("/login")} />
```

You may utilize `useGoBack` for getting a handler for going back to the previous route instead of manually calling the `history` object:

```js
import { useBoBack } from "@spyke/react-hook-router-link";

const handleGoBack = useGoBack();

<Button label="Go Back" onClick={handleGoBack} />
```

Or if you want just one specific prop there are separate hooks applying the same logic as React Router Link does inside:

```js
import { useGoTo, useHref } from "@spyke/react-hook-router-link";

const settingsHref = useHref("/settings");
const handleGoToSettings = useGoTo("/settings");

<a href="settingsHref" onClick={handleGoToSettings}>
  Open Settings
</a>
```

All hooks accept a Location object instead of a plain path string.

## License

Based on the code in the [react-router](https://github.com/ReactTraining/react-router).

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
