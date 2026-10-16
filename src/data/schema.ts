import { z } from 'zod';

export const PropertyCategorySchema = z.enum([
  'Lakeview Villa',
  'Garden Villa',
  'Duplex Villa',
  'Twin Villa',
  'Courtyard Villa',
  'Corner Villa',
  'Cottage Studio',
]);

export type PropertyCategory = z.infer<typeof PropertyCategorySchema>;

export const PropertyStatusSchema = z.enum([
  'available',
  'booked',
  'sold',
  'handed-over',
  'upcoming',
]);

export type PropertyStatus = z.infer<typeof PropertyStatusSchema>;

export const FloorPlanSchema = z.object({
  floor: z.string(),
  areaSqft: z.number().positive(),
  description: z.string(),
  image: z.string(),
});

export type FloorPlan = z.infer<typeof FloorPlanSchema>;

export const PropertyCoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const PropertyItemSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  category: PropertyCategorySchema,
  status: PropertyStatusSchema,
  project: z.string(),
  locationArea: z.string(),
  price: z.number().positive(),
  pricePerSqft: z.number().positive(),
  landSizeKatha: z.number().positive(),
  builtAreaSqft: z.number().positive(),
  bedrooms: z.number().int().nonnegative(),
  bathrooms: z.number().int().nonnegative(),
  floors: z.number().int().positive(),
  parking: z.number().int().nonnegative(),
  facing: z.string(),
  amenities: z.array(z.string()),
  description: z.object({
    en: z.string(),
    bn: z.string(),
  }),
  images: z.array(z.string()).min(1),
  floorPlans: z.array(FloorPlanSchema),
  videoUrl: z.string().optional(),
  virtualTourUrl: z.string().optional(),
  coordinates: PropertyCoordinatesSchema,
  featured: z.boolean(),
  createdAt: z.string(),
  demo: z.literal(true),
});

export type PropertyItem = z.infer<typeof PropertyItemSchema>;

export const PropertiesListSchema = z.array(PropertyItemSchema);

// Form Schemas
export const InquiryFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  propertyInterest: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  honeypot: z.string().max(0, 'Bot detected'),
  formStartTime: z.number(),
});

export type InquiryFormData = z.infer<typeof InquiryFormSchema>;

export const CallbackFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  preferredTime: z.string().min(1, 'Please select a preferred time slot'),
  honeypot: z.string().max(0, 'Bot detected'),
  formStartTime: z.number(),
});

export type CallbackFormData = z.infer<typeof CallbackFormSchema>;

export const VisitScheduleFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  visitDate: z.string().min(1, 'Please select a visit date'),
  visitTime: z.string().min(1, 'Please select a visit time slot'),
  numberOfGuests: z.number().min(1).max(10),
  pickupNeeded: z.boolean(),
  honeypot: z.string().max(0, 'Bot detected'),
  formStartTime: z.number(),
});

export type VisitScheduleFormData = z.infer<typeof VisitScheduleFormSchema>;
