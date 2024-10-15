import { z, ZodIssueCode } from "zod";
import { DivisionNames } from "../../utils/Globals";

export const AddDivisionSchema = (divisionNames: DivisionNames) => {
  return z.object({
    department_id: z.string().superRefine((data, ctx) => {
      if (data === "none") {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "This field is required.",
        });
        return;
      }
      if (!z.string().uuid().safeParse(data).success) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Invalid input.",
        });
        return;
      }
    }),

    division_name: z
      .string()
      .trim()
      .min(1, "This field is required.")
      .max(150, "This field only accepts up to 150 characters.")
      .regex(/^[A-Za-z\s]+$/, "Invalid input.")
      .superRefine((data, ctx) => {
        if (divisionNames) {
          if (
            divisionNames.some(
              (item) => item.division.toLowerCase() === data.toLowerCase(),
            )
          ) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              message: "Division name already exists.",
            });
          }
        } else {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: "No data has been fetched.",
          });
        }
      }),

    division_head: z
      .string()
      .nullable()
      .refine(
        (value) =>
          value === "none" || z.string().uuid().safeParse(value).success,
        "Invalid input.",
      )
      .optional(),
  });
};
export type AddDivisionSType = z.infer<ReturnType<typeof AddDivisionSchema>>;
