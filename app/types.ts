import * as z from "zod";

export const ImageSchema = z.object({
  title: z.string(),
  url: z.string(),
  link: z.string(),
});
export type Image = z.infer<typeof ImageSchema>;

export const ItemSchema = z.object({
  title: z.string(),
  link: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updated: z.string(),
  relLink: z.string(),
  sourceFeed: z.string(),
  alertId: z.string(),
  copyright: z.string(),
  isoPubDate: z.coerce.date(),
  preservationCopy: z.string(),
});
export type Item = z.infer<typeof ItemSchema>;

export const ChannelSchema = z.object({
  link: z.array(z.string()),
  title: z.string(),
  description: z.string(),
  language: z.string(),
  copyright: z.string(),
  pubDate: z.string(),
  docs: z.string(),
  image: ImageSchema,
  ccfeedver: z.string(),
  lastBuildDate: z.string(),
  item: z.array(ItemSchema),
});
export type Channel = z.infer<typeof ChannelSchema>;

export const RssSchema = z.object({
  channel: ChannelSchema,
});
export type Rss = z.infer<typeof RssSchema>;

export const HubResultSchema = z.object({
  "?xml": z.string(),
  "?xml-stylesheet": z.string(),
  rss: RssSchema,
});
export type HubResult = z.infer<typeof HubResultSchema>;

export const CodeElementSchema = z.enum([
  "layer:EC-MSC-SMC:1.0",
  "layer:EC-MSC-SMC:1.1",
  "layer:SOREM:1.0",
  "layer:SOREM:2.0",
  "profile:CAP-CP:0.4",
  "",
  "IPAWSv1.0",
]);
export type CodeElement = z.infer<typeof CodeElementSchema>;

export const AudienceEnumSchema = z.enum(["general public", "grand public"]);
export type AudienceEnum = z.infer<typeof AudienceEnumSchema>;

export const CategorySchema = z.enum([
  "Geo",
  "Met",
  "Safety",
  "Security",
  "Rescue",
  "Fire",
  "Health",
  "Env",
  "Transport",
  "Infra",
  "CBRNE",
  "Other",
]);
export type Category = z.infer<typeof CategorySchema>;

export const CertaintySchema = z.enum([
  "Likely",
  "Observed",
  "Possible",
  "Unknown",
  // Deprecated
  "Very Likely",
]);
export type Certainty = z.infer<typeof CertaintySchema>;

export const LanguageSchema = z.enum([
  "en-CA",
  "en-EN",
  "en-IN",
  "en-US",
  "et-ET",
  "fr-CA",
  "KN",
  "ko-KR",
  "ru-RU",
  "zh-CN",
]);
export type Language = z.infer<typeof LanguageSchema>;

export const ResponseTypeSchema = z.enum([
  "",
  "Shelter",
  "Evacuate",
  "Prepare",
  "Execute",
  "Avoid",
  "Monitor",
  "Assess",
  "AllClear",
  "None",
]);
export type ResponseType = z.infer<typeof ResponseTypeSchema>;

export const SeveritySchema = z.enum([
  "Minor",
  "Moderate",
  "Severe",
  "Unknown",
  "Extreme",
]);
export type Severity = z.infer<typeof SeveritySchema>;

export const UrgencySchema = z.enum([
  "Expected",
  "Future",
  "Immediate",
  "Past",
  "Unknown",
]);
export type Urgency = z.infer<typeof UrgencySchema>;

export const MsgTypeSchema = z.enum([
  "Alert",
  "Cancel",
  "Update",
  "Ack",
  "Error",
]);
export type MsgType = z.infer<typeof MsgTypeSchema>;

export const ScopeSchema = z.enum(["Public", "Restricted", "Private"]);
export type Scope = z.infer<typeof ScopeSchema>;

export const StatusSchema = z.enum([
  "Actual",
  "Test",
  "Exercise",
  "Draft",
  "System",
]);
export type Status = z.infer<typeof StatusSchema>;

export const ParameterElementSchema = z.object({
  valueName: z.string(),
  value: z.union([z.number(), z.string()]),
});
export type ParameterElement = z.infer<typeof ParameterElementSchema>;

export const X509DataSchema = z.object({
  X509Certificate: z.string(),
});
export type X509Data = z.infer<typeof X509DataSchema>;

export const SignaturePropertySchema = z.object({
  value: z.string(),
});
export type SignatureProperty = z.infer<typeof SignaturePropertySchema>;

export const TransformsSchema = z.object({
  Transform: z.string(),
});
export type Transforms = z.infer<typeof TransformsSchema>;

const CapCircleSchema = z.templateLiteral([
  // Latitude
  z.number(),
  ",",
  // Longitude
  z.number(),
  " ",
  // Radius in kilometers
  z.number(),
]);

export const AreaElementSchema = z.object({
  areaDesc: z.string(),
  polygon: z.union([z.array(z.string()), z.string()]).optional(),
  geocode: z
    .union([z.array(ParameterElementSchema), ParameterElementSchema])
    .optional(),
  altitude: z.number().optional(),
  ceiling: z.number().optional(),
  circle: CapCircleSchema.optional(),
});
export type AreaElement = z.infer<typeof AreaElementSchema>;

export const KeyInfoSchema = z.object({ X509Data: X509DataSchema });
export type KeyInfo = z.infer<typeof KeyInfoSchema>;

export const SignaturePropertiesSchema = z.object({
  SignatureProperty: z.array(SignaturePropertySchema),
});
export type SignatureProperties = z.infer<typeof SignaturePropertiesSchema>;

export const ReferenceSchema = z.object({
  Transforms: TransformsSchema,
  DigestMethod: z.string(),
  DigestValue: z.string(),
});
export type Reference = z.infer<typeof ReferenceSchema>;

export const InfoElementSchema = z.object({
  language: LanguageSchema.optional(),
  category: CategorySchema,
  event: z.string(),
  responseType: ResponseTypeSchema.optional(),
  urgency: UrgencySchema,
  severity: SeveritySchema,
  certainty: CertaintySchema,
  audience: z.union([AudienceEnumSchema, z.number()]).optional(),
  eventCode: z
    .union([z.array(ParameterElementSchema), ParameterElementSchema])
    .optional(),
  effective: z.coerce.date().optional(),
  onset: z.coerce.date().optional(),
  expires: z.coerce.date().optional(),
  senderName: z.string().optional(),
  headline: z.string().optional(),
  description: z.string(),
  instruction: z.string().optional(),
  web: z.string().optional(),
  area: z.union([z.array(AreaElementSchema), AreaElementSchema]),
  contact: z.string().optional(),
  parameter: z
    .union([z.array(ParameterElementSchema), ParameterElementSchema])
    .optional(),
});
export type InfoElement = z.infer<typeof InfoElementSchema>;

export const ObjectClassSchema = z.object({
  SignatureProperties: SignaturePropertiesSchema,
});
export type ObjectClass = z.infer<typeof ObjectClassSchema>;

export const SignedInfoSchema = z.object({
  CanonicalizationMethod: z.string(),
  SignatureMethod: z.string(),
  Reference: ReferenceSchema,
});
export type SignedInfo = z.infer<typeof SignedInfoSchema>;

export const SignatureElementSchema = z.object({
  SignedInfo: SignedInfoSchema,
  SignatureValue: z.string(),
  KeyInfo: KeyInfoSchema,
  Object: ObjectClassSchema.optional(),
});
export type SignatureElement = z.infer<typeof SignatureElementSchema>;

export const AlertSchema = z.object({
  identifier: z.union([z.number(), z.string()]),
  sender: z.string(),
  sent: z.coerce.date(),
  status: StatusSchema,
  msgType: MsgTypeSchema,
  source: z.string().optional(),
  scope: ScopeSchema,
  references: z.string().optional(),
  info: z.union([z.array(InfoElementSchema), InfoElementSchema]),
  code: z.union([z.array(CodeElementSchema), CodeElementSchema]).optional(),
  note: z.string().optional(),
  Signature: z
    .union([z.array(SignatureElementSchema), SignatureElementSchema])
    .optional(),
  restriction: z.string().optional(),
  addresses: z.string().optional(),
  incidents: z.string().optional(),
});
export type Alert = z.infer<typeof AlertSchema>;

export const AlertResultElementSchema = z.object({
  alert: AlertSchema,
  "?xml": z.string().optional(),
  "?xml-stylesheet": z.string().optional(),
});
export type AlertResultElement = z.infer<typeof AlertResultElementSchema>;
