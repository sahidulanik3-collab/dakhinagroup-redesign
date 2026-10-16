# How to Add & Edit Properties (ADDING_PROPERTIES.md)

This non-technical guide explains how any team member can update, add, or delete properties from the Dakhina Group digital catalog without writing any code.

---

## 1. Where the Properties Live

All villa and plot listings are stored in a single readable data file:
```
src/data/properties.json
```
You can edit this file in any text editor (VS Code, Notepad++, GitHub Web Editor).

---

## 2. Property Structure Explained

Each villa entry is wrapped in `{ ... }` inside the list. Here is an annotated example:

```json
{
  "id": "dak-villa-01",
  "slug": "padma-lakeview-grand-villa",
  "title": "Padma Lakeview Grand Villa",
  "category": "Lakeview Villa",
  "status": "available",
  "project": "Dakhina City: Phase 1 (Lakeview Enclave)",
  "locationArea": "Sector 4, Dakhina City, Savar, Dhaka",
  "price": 24500000,
  "pricePerSqft": 5800,
  "landSizeKatha": 5.5,
  "builtAreaSqft": 4200,
  "bedrooms": 5,
  "bathrooms": 6,
  "floors": 3,
  "parking": 2,
  "facing": "South-East",
  "amenities": [
    "Lakefront Boardwalk",
    "Private Swimming Pool",
    "Solar Rooftop Array",
    "Smart Security Integration",
    "Dedicated Guard Post",
    "Lawn Garden"
  ],
  "description": {
    "en": "A prestigious 5-bedroom waterfront luxury residence overlooking the serene western natural lake of Dakhina City.",
    "bn": "দখিনা সিটির পশ্চিম প্রান্তের প্রাকৃতিক লেকের তীরে অবস্থিত মনোরম ৫ বেডরুমের বিলাসবহুল লেকভিউ ভিলা।"
  },
  "images": [
    "/assets/properties/padma-lakeview-1.webp",
    "/assets/properties/padma-lakeview-2.webp",
    "/assets/properties/padma-lakeview-3.webp"
  ],
  "floorPlans": [
    {
      "floor": "Ground Floor",
      "areaSqft": 1500,
      "description": "Double-height living lounge, guest suite, powder room, dining and wet kitchen",
      "image": "/assets/floorplans/plan-ground.svg"
    },
    {
      "floor": "First Floor",
      "areaSqft": 1400,
      "description": "Master suite with lakefront balcony, 2 family bedrooms with attached baths",
      "image": "/assets/floorplans/plan-first.svg"
    },
    {
      "floor": "Second Floor / Terrace",
      "areaSqft": 1300,
      "description": "Penthouse recreational lounge, rooftop garden terrace, utility & staff quarter",
      "image": "/assets/floorplans/plan-roof.svg"
    }
  ],
  "videoUrl": "https://youtu.be/jsMh07pOAy4",
  "virtualTourUrl": "https://my.matterport.com/show/?m=sample",
  "coordinates": {
    "lat": 23.8345,
    "lng": 90.3152
  },
  "featured": true,
  "createdAt": "2024-01-15",
  "demo": true
}
```

---

## 3. Accepted Categories
- `Lakeview Villa`
- `Garden Villa`
- `Duplex Villa`
- `Twin Villa`
- `Courtyard Villa`
- `Corner Villa`
- `Cottage Studio`

---

## 4. Accepted Status Values
- `available`: Ready for prospective buyer visits and booking.
- `booked`: Token down payment received; temporarily reserved.
- `sold`: Agreement executed.
- `handed-over`: Construction complete and keys delivered to client.
- `upcoming`: Planned in subsequent project sectors.

---

## 5. Adding New Photos
1. Place your image files into `public/assets/properties/`.
2. Format images as `.webp` or `.jpg` (under 300KB each).
3. Reference them in the `"images"` array using `/assets/properties/your-photo.webp`.

---

## 6. Safety Notice (`demo: true`)
Every sample listing has `"demo": true`. When real properties are added for production, set `"demo": false` so the "Sample listing" disclaimer badge disappears automatically.
