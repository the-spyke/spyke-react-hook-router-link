# @spyke/react-hook-router-link

<!-- [![downloads](https://img.shields.io/npm/dm/@spyke/react-hook-router-link)](https://www.npmjs.com/package/@spyke/react-hook-router-link)
[![ci](https://github.com/the-spyke/spyke-react-hook-router-link/workflows/CI/badge.svg)](https://github.com/the-spyke/spyke-react-hook-router-link/actions?query=workflow%3ACI)
[![codecov](https://codecov.io/gh/the-spyke/spyke-react-hook-router-link/branch/main/graph/badge.svg)](https://codecov.io/gh/the-spyke/spyke-react-hook-router-link)
[![rms](https://img.shields.io/badge/RMS-0.3.0-blue)](https://github.com/the-spyke/rms)
[![license](https://img.shields.io/npm/l/spyke/react-hook-router-link.svg)](https://github.com/the-spyke/spyke-react-hook-router-link/blob/master/LICENSE) -->

An extract from the `react-router` link handling logic for easier integration with 3rd party UI libraries.

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

const NavBar = () => {
  return (
    <Header>
      <Anchor label="WebApp" {...useLinkState("/")} />
      <Nav direction="row">
        <Anchor label="Login" icon={<Login />} {...useLinkState("/login")} />
        <Anchor label="Signup" icon={<Sign />} {...useLinkState("/signup")} />
      </Nav>
    </Header>
  );
};
```

You could apply `useGoBack` for getting a handler to go back in history:

```js
import { useBoBack } from "@spyke/react-hook-router-link";

const handleGoBack = useGoBack();

<Button label="Go back" onClick={handleGoBack} />
```

Or if you want just one specific prop there are separate hooks:

```js
import { useGoTo, useHref } from "@spyke/react-hook-router-link";

const settingsHref = useHref("/settings");
const handleGoToSettings = useGoTo("/settings");

<Anchor label="Go back" href="settingsHref" onClick={handleGoToSettings} />
```

## License

Based on the code in the [react-router](https://github.com/ReactTraining/react-router).

Licensed under the MIT License, see [LICENSE](LICENSE) for more information.
