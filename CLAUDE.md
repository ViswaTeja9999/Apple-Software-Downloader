# Apple Software Downloader

A React web app for browsing and downloading Apple IPSW firmware files (iOS, iPadOS, macOS) using the public `ipsw.me` API.

## Tech Stack

- React 17 (Create React App 5)
- Material-UI v4 (`@material-ui/core`, `@material-ui/icons`)
- React Router v5 — client-side routing
- Axios — API calls
- Lodash — safe property access (`_.get`)
- ipsw.me public API — live firmware data source

## Running the App

```bash
npm start       # dev server at localhost:3000
npm run build   # production build
npm test        # run tests
```

## Project Structure

```
src/
  App.js                      # Root: MUI ThemeProvider + Router + GlobalProvider; liquid-glass background blobs
  Pages/
    Home.jsx                  # Landing page: hero, 3 nav cards, Latest Releases section
    DevicePage.jsx            # Shared device browser (iPhone/iPad/Mac); year filter + search + grouped display
  Components/
    DeviceList.jsx            # Single device card — Apple CDN image (or MUI icon fallback)
    DeviceOsList.jsx          # Firmware version table (Signed / Unsigned sections); breadcrumb nav
    DownloadOs.jsx            # Firmware metadata table + Download + Release Notes buttons; breadcrumb nav
    StatusSideBar.jsx         # DEPRECATED — no longer used; breadcrumbs replaced the sidebar
    Header.jsx                # Glass header with live clock greeting + dark/light mode toggle
    Footer.jsx                # App footer
    ReleaseNotesDialog.jsx    # Glass dialog showing static iOS/macOS release highlights (available but not wired)
  Context/
    GlobalState.jsx           # React Context + useReducer provider; all API calls; restores persisted state from localStorage
    Reducer.jsx               # State reducer (6 action types); persists key state to localStorage
  Data/
    deviceImageMap.js         # Static map: identifier → { image: Apple CDN URL | null, year: YYYY }
    deviceSpecs.js            # Static map: identifier → { chip, ram, battery }
    releaseNotes.js           # Static release highlights per major iOS/macOS version (available but not wired)
```

> **No static device list files.** Device lists are fetched live from `https://api.ipsw.me/v4/devices?type=ipsw`.

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Landing page |
| `/iPhone` | `DevicePage` (deviceType="iPhone") | iPhone browser |
| `/iPad` | `DevicePage` (deviceType="iPad") | iPad browser |
| `/mac` | `DevicePage` (deviceType="Mac") | Mac browser |
| `/oslist` | `DeviceOsList` | Firmware list for selected device |
| `/download` | `DownloadOs` | Details + download for selected firmware |

## User Flow

1. **Home** — choose iPhone, iPad, or Mac; see latest signed OS versions below the nav cards
2. **Device Page** — browse devices grouped by release year; filter by year dropdown or search by name; `Home › iPhone` breadcrumb
3. **OS List** (`/oslist`) — firmware versions split into Signed and Unsigned tables; device image + specs shown at top; `Home › iPhone › device name` breadcrumb
4. **Download** (`/download`) — firmware metadata + Download button + Release Notes (Apple Support link); `Home › iPhone › device name › version` breadcrumb

## State Management

Global state via React Context + `useReducer` (`src/Context/`):

| State key           | Type         | Persisted     | Purpose |
|---------------------|--------------|---------------|---------|
| `darkMode`          | boolean      | localStorage  | Light/dark theme |
| `deviceList`        | array        | no            | All devices for the active category from ipsw.me |
| `deviceListLoading` | boolean      | no            | Spinner flag during device list fetch |
| `resdeviceFirmware` | object       | localStorage  | Full firmware list for the selected device |
| `firmwareResponse`  | object       | localStorage  | Details for a single selected firmware build |
| `deviceimage`       | string\|null | localStorage  | Apple CDN image URL for selected device |

> `resdeviceFirmware` and `firmwareResponse` are persisted so refreshing on `/oslist` or `/download` does not blank the screen.

### Actions (Reducer)

| Action type | Effect |
|---|---|
| `TOGGLE_DARK_MODE` | Flips `darkMode`; saves to localStorage |
| `DEVICE_LIST_LOADING` | Sets `deviceListLoading: true` |
| `GET_ALL_DEVICES` | Sets `deviceList`; clears loading flag |
| `GET_FIRMWARE_FOR_DEVICE` | Sets `resdeviceFirmware`; saves to localStorage |
| `GET_FIRMWARE_DETAILS` | Sets `firmwareResponse`; saves to localStorage |
| `DEVICE_IMG` | Sets `deviceimage`; saves to localStorage |

### Context functions

| Function | Description |
|---|---|
| `getAllDevices(type)` | Fetches device list filtered by prefix (`iPhone`, `iPad`, `Mac`/`iMac`/`ADP`) |
| `getdeviceFirmware(deviceId)` | Fetches all firmware for a device |
| `getfirmwareDetails(identifier, buildId)` | Fetches details for a specific build |
| `setdeviceImage(url)` | Stores device image in state + localStorage |
| `toggleDarkMode()` | Toggles dark/light mode |

## API Endpoints (ipsw.me)

| Method | URL | Used for |
|---|---|---|
| `GET` | `https://api.ipsw.me/v4/devices?type=ipsw` | All Apple Silicon device identifiers and names |
| `POST` | `https://api.ipsw.me/v4/device/{deviceId}?type=ipsw` | All firmware versions for a device |
| `GET` | `https://api.ipsw.me/v4/ipsw/{identifier}/{buildId}` | Details for a specific firmware build |

The Home page also calls `GET https://api.ipsw.me/v4/device/{id}?type=ipsw` for three representative devices (iPhone17,1 · iPad16,5 · Mac16,1) to populate the Latest Releases section.

## deviceImageMap.js

Single source of truth for:
- Apple CDN product image URLs per device identifier
- Device launch year per identifier

```js
"iPhone18,1": { image: "https://cdsassets.apple.com/.../iphone-17-pro-colors.png", year: 2025 },
"Mac14,8":    { image: null, year: 2023 },  // null = no CDN image; falls back to MUI icon
```

**Coverage:** iPhones (2007–2025), iPads (2010–2026), Macs (2020–2025).  
**Image source:** `https://cdsassets.apple.com/live/7WUAS350/images/` — Apple Support identify pages.  
**Devices with `image: null`:** Mac Pro 2023 (`Mac14,8`), MacBook Neo (`Mac17,5`).  
**Year** drives the year filter dropdown and grouped display in `DevicePage`.

## deviceSpecs.js

Single source of truth for device hardware specs:

```js
"iPhone18,1": { chip: "A19 Pro", ram: "8 GB",     battery: "3274 mAh" },
"iPad16,3":   { chip: "M4",      ram: "8–16 GB",  battery: "7606 mAh" },
"Mac16,1":    { chip: "M4",      ram: "16–32 GB", battery: "72.4 Wh"  },
"Macmini9,1": { chip: "M1",      ram: "8–16 GB",  battery: null       },
```

- **`battery: null`** = desktop Mac (no battery); battery chip is hidden in the UI
- **RAM ranges** (`"8–16 GB"`) for devices configurable at purchase (iPad Pro M2/M4/M5, all Apple Silicon Macs)
- **Mac battery in Wh**, mobile in mAh
- Displayed as blue glass pill chips in `DeviceOsList` and `DownloadOs` device info cards

## Home Page — Latest Releases Section

Fetches live from ipsw.me for three representative devices in parallel on mount:

| Key | Representative device | OS logo source |
|---|---|---|
| iOS | iPhone17,1 (iPhone 16 Pro) | `https://developer.apple.com/assets/elements/icons/ios/ios-256x256_2x.png` |
| iPadOS | iPad16,5 (iPad Pro M4 13") | `https://developer.apple.com/assets/elements/icons/ipados/ipados-256x256_2x.png` |
| macOS | Mac16,1 (MacBook Pro M4 14") | `https://developer.apple.com/assets/elements/icons/finder/finder-256x256_2x.png` |

Each card shows: OS logo · OS name with major version + codename · version · build ID · release date · green "Signed" indicator.  
Firmware sorting: signed firmwares sorted descending by `releasedate` to always show the actual latest (not just the first in API order).  
Skeleton placeholders shown while loading; errors silently swallowed.

macOS codename map: `{ '27': 'Emerald', '26': 'Tahoe', '15': 'Sequoia', '14': 'Sonoma', ... }`

## Breadcrumb Navigation

All inner screens show a breadcrumb below the page title instead of the old `StatusSideBar`:

| Screen | Breadcrumb |
|---|---|
| DevicePage | `Home › iPhone` (or iPad / Mac) |
| DeviceOsList | `Home › iPhone › device name` |
| DownloadOs | `Home › iPhone › device name › version` |

Uses react-router-dom `Link` and MUI `Breadcrumbs` with `"›"` separator. Breadcrumb links navigate back; final segment is a plain span.

## UI Design

- **Liquid glass aesthetic** — `backdrop-filter: blur()` + `rgba` backgrounds on all cards, headers, and tables
- **Background blobs** — two fixed blurred circles (blue top-left, purple bottom-right) in `App.js`
- **Dual theme** — dark (`#0d0d1a` bg) and light (`#dce4f0` bg); toggled via header switch; default is dark
- **Accent color** — `#0071e3` (Apple blue) for interactive elements, icons, year badges, spec chips, buttons
- **Card width** — 260px (nav cards and OS release cards share the same fixed width; hero and sections capped at 828px)
- **Sticky table headers** — solid opaque background (`rgb(16,16,34)` dark / `rgb(238,244,252)` light) so rows don't bleed through on scroll
- **Spec chips** — blue glass pills (`rgba(0,113,227,0.18)`, `borderRadius: 20px`) for chip / RAM / battery
- **Year badges** — same pill style as spec chips, shown above each year group in `DevicePage`
- **StatusSideBar** — still exists as a file but is no longer rendered anywhere; replaced by breadcrumbs

## Adding a New Device

1. Find the device identifier from `https://api.ipsw.me/v4/devices?type=ipsw`
2. Find the product image on an Apple Support "identify your device" page; grab the `cdsassets.apple.com` CDN URL
3. Add an entry to `src/Data/deviceImageMap.js`:
   ```js
   "iPhone19,1": { image: `${BASE}/iphone/iphone-18-colors.png`, year: 2026 },
   ```
4. Add an entry to `src/Data/deviceSpecs.js`:
   ```js
   "iPhone19,1": { chip: "A20 Pro", ram: "8 GB", battery: "3274 mAh" },
   ```
5. No other files need to change — `DevicePage` picks up the new year automatically
