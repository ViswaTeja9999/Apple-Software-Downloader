// Static hardware specs per device identifier
// Mac battery in Wh; mobile in mAh; null battery = desktop (no battery)
// Configurable devices show RAM as "min–max GB" range
const deviceSpecs = {

  // ── iPhones ────────────────────────────────────────────────────────────────
  "iPhone8,1":   { chip: "A9",          ram: "2 GB",     battery: "1715 mAh" },
  "iPhone8,2":   { chip: "A9",          ram: "2 GB",     battery: "2750 mAh" },
  "iPhone8,4":   { chip: "A9",          ram: "2 GB",     battery: "1624 mAh" }, // SE 1st gen
  "iPhone9,1":   { chip: "A10 Fusion",  ram: "2 GB",     battery: "1960 mAh" },
  "iPhone9,2":   { chip: "A10 Fusion",  ram: "3 GB",     battery: "2900 mAh" },
  "iPhone9,3":   { chip: "A10 Fusion",  ram: "2 GB",     battery: "1960 mAh" },
  "iPhone9,4":   { chip: "A10 Fusion",  ram: "3 GB",     battery: "2900 mAh" },
  "iPhone10,1":  { chip: "A11 Bionic",  ram: "2 GB",     battery: "1821 mAh" }, // 8
  "iPhone10,2":  { chip: "A11 Bionic",  ram: "3 GB",     battery: "2691 mAh" }, // 8 Plus
  "iPhone10,3":  { chip: "A11 Bionic",  ram: "3 GB",     battery: "2716 mAh" }, // X
  "iPhone10,4":  { chip: "A11 Bionic",  ram: "2 GB",     battery: "1821 mAh" },
  "iPhone10,5":  { chip: "A11 Bionic",  ram: "3 GB",     battery: "2691 mAh" },
  "iPhone10,6":  { chip: "A11 Bionic",  ram: "3 GB",     battery: "2716 mAh" }, // X
  "iPhone11,2":  { chip: "A12 Bionic",  ram: "4 GB",     battery: "2658 mAh" }, // XS
  "iPhone11,4":  { chip: "A12 Bionic",  ram: "4 GB",     battery: "3174 mAh" }, // XS Max
  "iPhone11,6":  { chip: "A12 Bionic",  ram: "4 GB",     battery: "3174 mAh" }, // XS Max
  "iPhone11,8":  { chip: "A12 Bionic",  ram: "3 GB",     battery: "2942 mAh" }, // XR
  "iPhone12,1":  { chip: "A13 Bionic",  ram: "4 GB",     battery: "3110 mAh" }, // 11
  "iPhone12,3":  { chip: "A13 Bionic",  ram: "4 GB",     battery: "3046 mAh" }, // 11 Pro
  "iPhone12,5":  { chip: "A13 Bionic",  ram: "4 GB",     battery: "3969 mAh" }, // 11 Pro Max
  "iPhone12,8":  { chip: "A13 Bionic",  ram: "3 GB",     battery: "1821 mAh" }, // SE 2nd gen
  "iPhone13,1":  { chip: "A14 Bionic",  ram: "4 GB",     battery: "2227 mAh" }, // 12 mini
  "iPhone13,2":  { chip: "A14 Bionic",  ram: "4 GB",     battery: "2815 mAh" }, // 12
  "iPhone13,3":  { chip: "A14 Bionic",  ram: "6 GB",     battery: "2815 mAh" }, // 12 Pro
  "iPhone13,4":  { chip: "A14 Bionic",  ram: "6 GB",     battery: "3687 mAh" }, // 12 Pro Max
  "iPhone14,2":  { chip: "A15 Bionic",  ram: "6 GB",     battery: "3095 mAh" }, // 13 Pro
  "iPhone14,3":  { chip: "A15 Bionic",  ram: "6 GB",     battery: "4352 mAh" }, // 13 Pro Max
  "iPhone14,4":  { chip: "A15 Bionic",  ram: "4 GB",     battery: "2438 mAh" }, // 13 mini
  "iPhone14,5":  { chip: "A15 Bionic",  ram: "4 GB",     battery: "3227 mAh" }, // 13
  "iPhone14,6":  { chip: "A15 Bionic",  ram: "4 GB",     battery: "2018 mAh" }, // SE 3rd gen
  "iPhone14,7":  { chip: "A15 Bionic",  ram: "6 GB",     battery: "3279 mAh" }, // 14
  "iPhone14,8":  { chip: "A15 Bionic",  ram: "6 GB",     battery: "4325 mAh" }, // 14 Plus
  "iPhone15,2":  { chip: "A16 Bionic",  ram: "6 GB",     battery: "3200 mAh" }, // 14 Pro
  "iPhone15,3":  { chip: "A16 Bionic",  ram: "6 GB",     battery: "4323 mAh" }, // 14 Pro Max
  "iPhone15,4":  { chip: "A16 Bionic",  ram: "6 GB",     battery: "3349 mAh" }, // 15
  "iPhone15,5":  { chip: "A16 Bionic",  ram: "6 GB",     battery: "4383 mAh" }, // 15 Plus
  "iPhone16,1":  { chip: "A17 Pro",     ram: "8 GB",     battery: "3274 mAh" }, // 15 Pro
  "iPhone16,2":  { chip: "A17 Pro",     ram: "8 GB",     battery: "4422 mAh" }, // 15 Pro Max
  "iPhone17,1":  { chip: "A18 Pro",     ram: "8 GB",     battery: "3582 mAh" }, // 16 Pro
  "iPhone17,2":  { chip: "A18 Pro",     ram: "8 GB",     battery: "4685 mAh" }, // 16 Pro Max
  "iPhone17,3":  { chip: "A18",         ram: "8 GB",     battery: "3561 mAh" }, // 16
  "iPhone17,4":  { chip: "A18",         ram: "8 GB",     battery: "4674 mAh" }, // 16 Plus
  "iPhone17,5":  { chip: "A16 Bionic",  ram: "8 GB",     battery: "3279 mAh" }, // 16e
  "iPhone18,1":  { chip: "A19 Pro",     ram: "8 GB",     battery: "3274 mAh" }, // 17 Pro
  "iPhone18,2":  { chip: "A19 Pro",     ram: "8 GB",     battery: "4685 mAh" }, // 17 Pro Max
  "iPhone18,3":  { chip: "A19",         ram: "8 GB",     battery: "3577 mAh" }, // 17
  "iPhone18,4":  { chip: "A18",         ram: "8 GB",     battery: "2868 mAh" }, // Air
  "iPhone18,5":  { chip: "A19",         ram: "8 GB",     battery: "3577 mAh" }, // 17 (variant)

  // ── iPads ──────────────────────────────────────────────────────────────────
  "iPad5,1":     { chip: "A8",          ram: "2 GB",     battery: "5124 mAh" }, // mini 4
  "iPad5,2":     { chip: "A8",          ram: "2 GB",     battery: "5124 mAh" },
  "iPad5,3":     { chip: "A8X",         ram: "2 GB",     battery: "7340 mAh" }, // Air 2
  "iPad5,4":     { chip: "A8X",         ram: "2 GB",     battery: "7340 mAh" },
  "iPad6,3":     { chip: "A9X",         ram: "2 GB",     battery: "5124 mAh" }, // Pro 9.7"
  "iPad6,4":     { chip: "A9X",         ram: "2 GB",     battery: "5124 mAh" },
  "iPad6,7":     { chip: "A9X",         ram: "4 GB",     battery: "10307 mAh" }, // Pro 12.9" 1st gen
  "iPad6,8":     { chip: "A9X",         ram: "4 GB",     battery: "10307 mAh" },
  "iPad6,11":    { chip: "A9",          ram: "2 GB",     battery: "8827 mAh" }, // iPad 5th gen
  "iPad6,12":    { chip: "A9",          ram: "2 GB",     battery: "8827 mAh" },
  "iPad7,1":     { chip: "A10X Fusion", ram: "4 GB",     battery: "10307 mAh" }, // Pro 12.9" 2nd gen
  "iPad7,2":     { chip: "A10X Fusion", ram: "4 GB",     battery: "10307 mAh" },
  "iPad7,3":     { chip: "A10X Fusion", ram: "4 GB",     battery: "8134 mAh" }, // Pro 10.5"
  "iPad7,4":     { chip: "A10X Fusion", ram: "4 GB",     battery: "8134 mAh" },
  "iPad7,5":     { chip: "A10 Fusion",  ram: "3 GB",     battery: "8827 mAh" }, // iPad 6th gen
  "iPad7,6":     { chip: "A10 Fusion",  ram: "3 GB",     battery: "8827 mAh" },
  "iPad7,11":    { chip: "A10 Fusion",  ram: "3 GB",     battery: "8827 mAh" }, // iPad 7th gen
  "iPad7,12":    { chip: "A10 Fusion",  ram: "3 GB",     battery: "8827 mAh" },
  "iPad8,1":     { chip: "A12X Bionic", ram: "4 GB",     battery: "7538 mAh" }, // Pro 11" 1st gen
  "iPad8,2":     { chip: "A12X Bionic", ram: "4 GB",     battery: "7538 mAh" },
  "iPad8,3":     { chip: "A12X Bionic", ram: "6 GB",     battery: "7538 mAh" },
  "iPad8,4":     { chip: "A12X Bionic", ram: "6 GB",     battery: "7538 mAh" },
  "iPad8,5":     { chip: "A12X Bionic", ram: "4 GB",     battery: "9720 mAh" }, // Pro 12.9" 3rd gen
  "iPad8,6":     { chip: "A12X Bionic", ram: "4 GB",     battery: "9720 mAh" },
  "iPad8,7":     { chip: "A12X Bionic", ram: "6 GB",     battery: "9720 mAh" },
  "iPad8,8":     { chip: "A12X Bionic", ram: "6 GB",     battery: "9720 mAh" },
  "iPad8,9":     { chip: "A12Z Bionic", ram: "6 GB",     battery: "7538 mAh" }, // Pro 11" 2nd gen
  "iPad8,10":    { chip: "A12Z Bionic", ram: "6 GB",     battery: "7538 mAh" },
  "iPad8,11":    { chip: "A12Z Bionic", ram: "6 GB",     battery: "9720 mAh" }, // Pro 12.9" 4th gen
  "iPad8,12":    { chip: "A12Z Bionic", ram: "6 GB",     battery: "9720 mAh" },
  "iPad11,1":    { chip: "A12 Bionic",  ram: "3 GB",     battery: "5124 mAh" }, // mini 5
  "iPad11,2":    { chip: "A12 Bionic",  ram: "3 GB",     battery: "5124 mAh" },
  "iPad11,3":    { chip: "A12 Bionic",  ram: "3 GB",     battery: "7786 mAh" }, // Air 3
  "iPad11,4":    { chip: "A12 Bionic",  ram: "3 GB",     battery: "7786 mAh" },
  "iPad11,6":    { chip: "A12 Bionic",  ram: "3 GB",     battery: "8827 mAh" }, // iPad 8th gen
  "iPad11,7":    { chip: "A12 Bionic",  ram: "3 GB",     battery: "8827 mAh" },
  "iPad12,1":    { chip: "A13 Bionic",  ram: "3 GB",     battery: "8557 mAh" }, // iPad 9th gen
  "iPad12,2":    { chip: "A13 Bionic",  ram: "3 GB",     battery: "8557 mAh" },
  "iPad13,1":    { chip: "A14 Bionic",  ram: "4 GB",     battery: "7606 mAh" }, // Air 4th gen
  "iPad13,2":    { chip: "A14 Bionic",  ram: "4 GB",     battery: "7606 mAh" },
  "iPad13,4":    { chip: "M1",          ram: "8 GB",     battery: "7538 mAh" }, // Pro 11" M1 (8GB config)
  "iPad13,5":    { chip: "M1",          ram: "8 GB",     battery: "7538 mAh" },
  "iPad13,6":    { chip: "M1",          ram: "16 GB",    battery: "7538 mAh" }, // Pro 11" M1 (16GB config)
  "iPad13,7":    { chip: "M1",          ram: "16 GB",    battery: "7538 mAh" },
  "iPad13,8":    { chip: "M1",          ram: "8 GB",     battery: "10307 mAh" }, // Pro 12.9" M1 (8GB config)
  "iPad13,9":    { chip: "M1",          ram: "8 GB",     battery: "10307 mAh" },
  "iPad13,10":   { chip: "M1",          ram: "16 GB",    battery: "10307 mAh" }, // Pro 12.9" M1 (16GB config)
  "iPad13,11":   { chip: "M1",          ram: "16 GB",    battery: "10307 mAh" },
  "iPad13,16":   { chip: "M1",          ram: "8 GB",     battery: "7526 mAh" }, // Air 5th gen
  "iPad13,17":   { chip: "M1",          ram: "8 GB",     battery: "7526 mAh" },
  "iPad13,18":   { chip: "A14 Bionic",  ram: "4 GB",     battery: "7606 mAh" }, // iPad 10th gen
  "iPad13,19":   { chip: "A14 Bionic",  ram: "4 GB",     battery: "7606 mAh" },
  "iPad14,1":    { chip: "A15 Bionic",  ram: "4 GB",     battery: "5124 mAh" }, // mini 6
  "iPad14,2":    { chip: "A15 Bionic",  ram: "4 GB",     battery: "5124 mAh" },
  "iPad14,3":    { chip: "M2",          ram: "8–16 GB",  battery: "7538 mAh" }, // Pro 11" M2
  "iPad14,4":    { chip: "M2",          ram: "8–16 GB",  battery: "7538 mAh" },
  "iPad14,5":    { chip: "M2",          ram: "8–16 GB",  battery: "10307 mAh" }, // Pro 12.9" M2
  "iPad14,6":    { chip: "M2",          ram: "8–16 GB",  battery: "10307 mAh" },
  "iPad14,8":    { chip: "M2",          ram: "8 GB",     battery: "7526 mAh" }, // Air M2 11"
  "iPad14,9":    { chip: "M2",          ram: "8 GB",     battery: "7526 mAh" },
  "iPad14,10":   { chip: "M2",          ram: "8 GB",     battery: "10307 mAh" }, // Air M2 13"
  "iPad14,11":   { chip: "M2",          ram: "8 GB",     battery: "10307 mAh" },
  "iPad15,3":    { chip: "M3",          ram: "8 GB",     battery: "7526 mAh" }, // Air M3 11"
  "iPad15,4":    { chip: "M3",          ram: "8 GB",     battery: "7526 mAh" },
  "iPad15,5":    { chip: "M3",          ram: "8 GB",     battery: "10307 mAh" }, // Air M3 13"
  "iPad15,6":    { chip: "M3",          ram: "8 GB",     battery: "10307 mAh" },
  "iPad15,7":    { chip: "A16 Bionic",  ram: "8 GB",     battery: "7606 mAh" }, // iPad 11th gen
  "iPad15,8":    { chip: "A16 Bionic",  ram: "8 GB",     battery: "7606 mAh" },
  "iPad16,1":    { chip: "A17 Pro",     ram: "8 GB",     battery: "5124 mAh" }, // mini 7
  "iPad16,2":    { chip: "A17 Pro",     ram: "8 GB",     battery: "5124 mAh" },
  "iPad16,3":    { chip: "M4",          ram: "8–16 GB",  battery: "7606 mAh" }, // Pro M4 11"
  "iPad16,4":    { chip: "M4",          ram: "8–16 GB",  battery: "7606 mAh" },
  "iPad16,5":    { chip: "M4",          ram: "8–16 GB",  battery: "10307 mAh" }, // Pro M4 13"
  "iPad16,6":    { chip: "M4",          ram: "8–16 GB",  battery: "10307 mAh" },
  "iPad16,8":    { chip: "M4",          ram: "8 GB",     battery: "7526 mAh" }, // Air M4 11"
  "iPad16,9":    { chip: "M4",          ram: "8 GB",     battery: "7526 mAh" },
  "iPad16,10":   { chip: "M4",          ram: "8 GB",     battery: "10307 mAh" }, // Air M4 13"
  "iPad16,11":   { chip: "M4",          ram: "8 GB",     battery: "10307 mAh" },
  "iPad17,1":    { chip: "M5",          ram: "8–16 GB",  battery: "7538 mAh" }, // Pro M5 11"
  "iPad17,2":    { chip: "M5",          ram: "8–16 GB",  battery: "7538 mAh" },
  "iPad17,3":    { chip: "M5",          ram: "8–16 GB",  battery: "10307 mAh" }, // Pro M5 13"
  "iPad17,4":    { chip: "M5",          ram: "8–16 GB",  battery: "10307 mAh" },

  // ── Macs (battery in Wh; null = desktop) ──────────────────────────────────
  "MacBookAir10,1": { chip: "M1",       ram: "8–16 GB",  battery: "49.9 Wh" },
  "MacBookPro17,1": { chip: "M1",       ram: "8–16 GB",  battery: "58.2 Wh" },
  "MacBookPro18,1": { chip: "M1 Max",   ram: "32–64 GB", battery: "99.6 Wh" },
  "MacBookPro18,2": { chip: "M1 Pro",   ram: "16–32 GB", battery: "99.6 Wh" },
  "MacBookPro18,3": { chip: "M1 Max",   ram: "32–64 GB", battery: "69.6 Wh" },
  "MacBookPro18,4": { chip: "M1 Pro",   ram: "16–32 GB", battery: "69.6 Wh" },
  "Macmini9,1":     { chip: "M1",       ram: "8–16 GB",  battery: null },
  "iMac21,1":       { chip: "M1",       ram: "8–16 GB",  battery: null },
  "iMac21,2":       { chip: "M1",       ram: "8–16 GB",  battery: null },
  "Mac13,1":        { chip: "M1 Max",   ram: "32–64 GB", battery: null },
  "Mac13,2":        { chip: "M1 Ultra", ram: "64–128 GB",battery: null },
  "Mac14,2":        { chip: "M2",       ram: "8–24 GB",  battery: "52.6 Wh" },
  "Mac14,3":        { chip: "M2",       ram: "8–16 GB",  battery: null },
  "Mac14,5":        { chip: "M2 Pro",   ram: "16–32 GB", battery: "69.6 Wh" },
  "Mac14,6":        { chip: "M2 Pro",   ram: "16–32 GB", battery: "99.6 Wh" },
  "Mac14,7":        { chip: "M2",       ram: "8–24 GB",  battery: "58.2 Wh" },
  "Mac14,8":        { chip: "M2 Ultra", ram: "96–192 GB",battery: null },
  "Mac14,9":        { chip: "M2 Max",   ram: "32–96 GB", battery: "69.6 Wh" },
  "Mac14,10":       { chip: "M2 Max",   ram: "32–96 GB", battery: "99.6 Wh" },
  "Mac14,12":       { chip: "M2 Pro",   ram: "16–32 GB", battery: null },
  "Mac14,13":       { chip: "M2 Max",   ram: "32–192 GB",battery: null },
  "Mac14,14":       { chip: "M2 Ultra", ram: "64–192 GB",battery: null },
  "Mac14,15":       { chip: "M2",       ram: "8–24 GB",  battery: "66.5 Wh" },
  "Mac15,3":        { chip: "M3",       ram: "8–24 GB",  battery: "72.4 Wh" },
  "Mac15,4":        { chip: "M3",       ram: "8–24 GB",  battery: null },
  "Mac15,5":        { chip: "M3",       ram: "8–24 GB",  battery: null },
  "Mac15,6":        { chip: "M3 Pro",   ram: "18–36 GB", battery: "72.4 Wh" },
  "Mac15,7":        { chip: "M3 Pro",   ram: "18–36 GB", battery: "99.6 Wh" },
  "Mac15,8":        { chip: "M3 Max",   ram: "36–128 GB",battery: "72.4 Wh" },
  "Mac15,9":        { chip: "M3 Max",   ram: "36–128 GB",battery: "99.6 Wh" },
  "Mac15,10":       { chip: "M3 Max",   ram: "36–128 GB",battery: "72.4 Wh" },
  "Mac15,11":       { chip: "M3 Max",   ram: "36–128 GB",battery: "99.6 Wh" },
  "Mac15,12":       { chip: "M3",       ram: "8–24 GB",  battery: "49.9 Wh" },
  "Mac15,13":       { chip: "M3",       ram: "8–24 GB",  battery: "66.5 Wh" },
  "Mac15,14":       { chip: "M3 Ultra", ram: "192 GB",   battery: null },
  "Mac16,1":        { chip: "M4",       ram: "16–32 GB", battery: "72.4 Wh" },
  "Mac16,2":        { chip: "M4",       ram: "16–32 GB", battery: null },
  "Mac16,3":        { chip: "M4",       ram: "16–32 GB", battery: null },
  "Mac16,5":        { chip: "M4 Pro",   ram: "24–48 GB", battery: "99.6 Wh" },
  "Mac16,6":        { chip: "M4 Pro",   ram: "24–48 GB", battery: "72.4 Wh" },
  "Mac16,7":        { chip: "M4 Max",   ram: "36–128 GB",battery: "99.6 Wh" },
  "Mac16,8":        { chip: "M4 Max",   ram: "36–128 GB",battery: "72.4 Wh" },
  "Mac16,9":        { chip: "M4 Max",   ram: "36–128 GB",battery: null },
  "Mac16,10":       { chip: "M4",       ram: "16–24 GB", battery: null },
  "Mac16,11":       { chip: "M4 Pro",   ram: "24–64 GB", battery: null },
  "Mac16,12":       { chip: "M4",       ram: "16–32 GB", battery: "49.9 Wh" },
  "Mac16,13":       { chip: "M4",       ram: "16–32 GB", battery: "66.5 Wh" },
  "Mac17,2":        { chip: "M5",       ram: "16–32 GB", battery: "72.4 Wh" },
  "Mac17,3":        { chip: "M5",       ram: "16–32 GB", battery: "49.9 Wh" },
  "Mac17,4":        { chip: "M5",       ram: "16–32 GB", battery: "66.5 Wh" },
  "Mac17,5":        { chip: "M5",       ram: "16–24 GB", battery: null },
  "Mac17,6":        { chip: "M5 Pro",   ram: "24–48 GB", battery: "99.6 Wh" },
  "Mac17,7":        { chip: "M5 Pro",   ram: "24–48 GB", battery: "72.4 Wh" },
  "Mac17,8":        { chip: "M5 Max",   ram: "36–128 GB",battery: "99.6 Wh" },
  "Mac17,9":        { chip: "M5 Max",   ram: "36–128 GB",battery: "72.4 Wh" },
};

export default deviceSpecs;
