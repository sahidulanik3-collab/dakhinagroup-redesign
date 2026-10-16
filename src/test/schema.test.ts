import { describe, it, expect } from 'vitest';
import propertiesData from '../data/properties.json';
import { PropertiesListSchema, PropertyItem } from '../data/schema';

describe('Properties Data & Schema Integrity', () => {
  it('should validate exactly 48 properties in properties.json against Zod schema', () => {
    expect(propertiesData).toHaveLength(48);
    const parsed = PropertiesListSchema.safeParse(propertiesData);
    expect(parsed.success).toBe(true);
  });

  it('every property must have demo: true to guarantee sample data compliance', () => {
    const list = propertiesData as PropertyItem[];
    list.forEach((prop) => {
      expect(prop.demo).toBe(true);
    });
  });

  it('should have a balanced distribution across all 7 villa categories', () => {
    const list = propertiesData as PropertyItem[];
    const categoryCounts: Record<string, number> = {};

    list.forEach((prop) => {
      categoryCounts[prop.category] = (categoryCounts[prop.category] || 0) + 1;
    });

    const expectedCategories = [
      'Lakeview Villa',
      'Garden Villa',
      'Duplex Villa',
      'Twin Villa',
      'Courtyard Villa',
      'Corner Villa',
      'Cottage Studio',
    ];

    expectedCategories.forEach((cat) => {
      expect(categoryCounts[cat]).toBeGreaterThanOrEqual(4);
    });
  });

  it('every property must have valid coordinates, floor plans, and at least 3 images', () => {
    const list = propertiesData as PropertyItem[];
    list.forEach((prop) => {
      expect(prop.coordinates.lat).toBeGreaterThan(23.0);
      expect(prop.coordinates.lng).toBeGreaterThan(90.0);
      expect(prop.floorPlans.length).toBeGreaterThanOrEqual(1);
      expect(prop.images.length).toBeGreaterThanOrEqual(3);
      expect(prop.price).toBeGreaterThan(0);
      expect(prop.builtAreaSqft).toBeGreaterThan(0);
      expect(prop.landSizeKatha).toBeGreaterThan(0);
    });
  });
});
