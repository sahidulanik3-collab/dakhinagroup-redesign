import { describe, it, expect } from 'vitest';
import propertiesData from '../data/properties.json';
import { PropertyItem } from '../data/schema';

describe('Property Filtering, Search and Sort Logic', () => {
  const properties = propertiesData as PropertyItem[];

  it('filters correctly by category', () => {
    const lakeview = properties.filter((p) => p.category === 'Lakeview Villa');
    expect(lakeview.length).toBeGreaterThan(0);
    lakeview.forEach((p) => expect(p.category).toBe('Lakeview Villa'));

    const duplex = properties.filter((p) => p.category === 'Duplex Villa');
    expect(duplex.length).toBeGreaterThan(0);
    duplex.forEach((p) => expect(p.category).toBe('Duplex Villa'));
  });

  it('filters correctly by status', () => {
    const available = properties.filter((p) => p.status === 'available');
    expect(available.length).toBeGreaterThan(0);
    available.forEach((p) => expect(p.status).toBe('available'));
  });

  it('filters within a specified price range in BDT', () => {
    const minPrice = 10000000; // 1.0 Cr
    const maxPrice = 25000000; // 2.5 Cr

    const filtered = properties.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    expect(filtered.length).toBeGreaterThan(0);
    filtered.forEach((p) => {
      expect(p.price).toBeGreaterThanOrEqual(minPrice);
      expect(p.price).toBeLessThanOrEqual(maxPrice);
    });
  });

  it('filters by minimum bedroom count', () => {
    const fourPlusBeds = properties.filter((p) => p.bedrooms >= 4);
    expect(fourPlusBeds.length).toBeGreaterThan(0);
    fourPlusBeds.forEach((p) => expect(p.bedrooms).toBeGreaterThanOrEqual(4));
  });

  it('searches by keyword across title, location and category', () => {
    const query = 'Lakeview';
    const results = properties.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.locationArea.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
    );

    expect(results.length).toBeGreaterThan(0);
    results.forEach((p) => {
      const match =
        p.title.toLowerCase().includes('lakeview') ||
        p.locationArea.toLowerCase().includes('lakeview') ||
        p.category.toLowerCase().includes('lakeview');
      expect(match).toBe(true);
    });
  });

  it('sorts properties by price ascending and descending correctly', () => {
    const asc = [...properties].sort((a, b) => a.price - b.price);
    for (let i = 0; i < asc.length - 1; i++) {
      expect(asc[i].price).toBeLessThanOrEqual(asc[i + 1].price);
    }

    const desc = [...properties].sort((a, b) => b.price - a.price);
    for (let i = 0; i < desc.length - 1; i++) {
      expect(desc[i].price).toBeGreaterThanOrEqual(desc[i + 1].price);
    }
  });
});
