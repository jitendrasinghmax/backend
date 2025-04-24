import { z } from "zod";

// User validation schema
export const userValidationSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters long")
});



// Note validation schema
export const noteValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  note: z.string().min(1, "Note content is required"),
  backgroundColor: z.string(),
  owner: z.string(),
  colaborators: z.array(z.string()).optional()
});
export const noteUpdateValidationSchema=z.object({
  title: z.string().min(1, "Title is required"),
  note: z.string().min(1, "Note content is required"),
  backgroundColor: z.string(),
  colaborators: z.array(z.string()).optional()
})
export const getNotesValidationSchema=z.object({
  _id:z.string()
})
export const getNotesIdsValidationSchema=z.object({
  owner:z.string()
})
// Validation functions for User model
export const validateUser = (userData: unknown) => {
  return userValidationSchema.safeParse(userData);
};

// Validation functions for Note model
export const validateNote = (noteData: unknown) => {
  return noteValidationSchema.safeParse(noteData);
};
export const validateNoteUpdate= (noteData: unknown) => {
  return noteUpdateValidationSchema.safeParse(noteData);
};
export const validateGetNotes= (noteData: unknown) => {
  return getNotesValidationSchema.safeParse(noteData);
};
export const validateGetNotesIds= (noteData: unknown) => {
  return getNotesIdsValidationSchema.safeParse(noteData);
};

// Login validation schema
export const loginValidationSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Password is required")
});

export const validateLogin = (loginData: unknown) => {
  return loginValidationSchema.safeParse(loginData);
}; 