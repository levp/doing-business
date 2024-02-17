# Doing Business™

## Install dependencies

```sh
npm i
```

## Launch dev server for React client

```sh
cd moduels/react-client
npm run dev
```

## Build the core library (not needed for the demo)

```sh
cd modules/core
npm run build
```

## TODOs

- Add vue adapter
- Restructure "cadabra":
  - Signals should be a tiny lib containing the core signal logic (could also be replaced by something like preact-signals)
  - There should be a core library which has the plain js implementation of the functionality (like business and clipboard)
  - There should be a library for each framework. For example: A react library which has the "useSignal" in it and an adapter for each core functionality like useBusiness and useClipboard
