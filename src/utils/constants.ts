export const gender = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "others",
    label: "Others",
  },
];

export const degree = [
  {
    value: "Architecture, building and planning",
    label: "Architecture, building and planning",
  },
  {
    value: "Business, management and maths",
    label: "Business, management and maths",
  },
  {
    value: "Computer science",
    label: "Computer science",
  },
  {
    value: "Creative arts",
    label: "Creative arts",
  },
  {
    value: "Education",
    label: "Education",
  },
  {
    value: "Engineering",
    label: "Engineering",
  },
  {
    value: "English and media",
    label: "English and media",
  },
  {
    value: "Geography",
    label: "Geography",
  },
  {
    value: "History",
    label: "History",
  },
  {
    value: "Languages",
    label: "Languages",
  },
  {
    value: "Law",
    label: "Law",
  },
  {
    value: "Medicine and dentistry",
    label: "Medicine and dentistry",
  },
  {
    value: "Nursing and health",
    label: "Nursing and health",
  },
  {
    value: "Politics, philosophy and theology",
    label: "Politics, philosophy and theology",
  },
  {
    value: "Psychology and sociology",
    label: "Psychology and sociology",
  },
  {
    value: "Sciences",
    label: "Sciences",
  },
  {
    value: "Veterinary studies and agriculture",
    label: "Veterinary studies and agriculture",
  },
];

export const ageGroup = Array.from({ length: 71 }, (_, i) => {
  const value = (16 + i).toString();
  return { value, label: value };
});

export const yearGroup = generateYearObjects(1980);

//all dropdown menu's

export function generateYearObjects(startYear: number) {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear + 10; // Include the next 10 years
  return Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = (startYear + i).toString();
    return { value: year, label: year };
  });
}
