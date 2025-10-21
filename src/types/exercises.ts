export const exerciseEquipmentEnumValues = [
  "dumbbell",
  "barbell",
  "bodyweight",
] as const;
export type ExerciseEquipment = (typeof exerciseEquipmentEnumValues)[number];

export const exerciseCategoryEnumValues = [
  "arms",
  "shoulders",
  "chest",
  "back",
  "core",
  "legs",
  "full_body",
  "mobility",
  "cardio",
] as const;
export type ExerciseCategory = typeof exerciseCategoryEnumValues;
