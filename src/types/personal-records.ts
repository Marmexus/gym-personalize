export const prTypeEnumValues = ["weight", "reps", "sets"] as const;
export type PRType = (typeof prTypeEnumValues)[number];
