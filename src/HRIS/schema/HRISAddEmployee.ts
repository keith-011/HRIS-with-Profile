import { z, ZodIssueCode } from "zod";
import { EducationLevels, EmployeeNumbers } from "../../utils/Globals";

const currentYear = new Date().getFullYear();
const minimumYear = currentYear - 100;

const TextInput = (required: boolean, min: number, max: number) => {
  if (required) {
    return z
      .string()
      .trim()
      .min(min, "This field is required.")
      .max(max, `This field only accepts up to ${max} characters.`);
  } else {
    return z
      .string()
      .trim()
      .max(max, `This field only accepts up to ${max} characters.`);
  }
};

const SelectInputRequired = z
  .string()
  .trim()
  .min(1, "This field is required.")
  .superRefine((data, ctx) => {
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
  });

const SelectInputOptional = z
  .string()
  .trim()
  .refine(
    (value) => value === "none" || z.string().uuid().safeParse(value).success,
    "Invalid input.",
  )
  .transform((value) => (value === "none" ? "" : value));

const school_start = z
  .string()
  .trim()
  .min(1, "Year required.")
  .max(4, "Invalid year.")
  .refine((value) => !isNaN(Number(value)), "Invalid input.")
  .transform((value) => Number(value))
  .refine(
    (value) => value >= minimumYear && value <= currentYear,
    `Year must be between ${minimumYear} and ${currentYear}`,
  );

const school_end = z
  .string()
  .trim()
  .max(4, "Invalid year.")
  .transform((value) => {
    return value === "" ? null : Number(value);
  });

export const NewSchemaAddEmployee = (
  employeeNumberList: EmployeeNumbers[],
  educationLevelStatus: EducationLevels,
) => {
  return z
    .object({
      // Account Information
      employee_number: TextInput(true, 1, 50).refine(
        (value) =>
          !employeeNumberList.some((field) => value === field.employee_number),
        "Employee number already exists.",
      ),
      password: z
        .string()
        .min(1, "This field is required.")
        .max(50, "This field only accepts up to 50 characters.")
        .refine(
          (value) => value.length >= 8,
          "Password must be at least 8 characters.",
        ),
      confirm_password: z.string().min(1, "Password is required."),

      // Personal Information
      firstName: TextInput(true, 1, 50).regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        "Invalid input.",
      ),

      middleName: TextInput(false, 0, 50)
        .refine(
          (value) => value === "" || /^[A-Za-zÀ-ÿ\s'-]+$/.test(value),
          "Invalid input",
        )
        .optional(),

      lastName: TextInput(true, 1, 50).regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        "Invalid input.",
      ),

      suffix: TextInput(false, 0, 10)
        .refine(
          (value) => value === "" || /^[A-Za-z]+$/.test(value),
          "Invalid input.",
        )
        .optional(),

      birthday: TextInput(true, 1, 25).refine(
        (value) => !isNaN(Date.parse(value)),
        "Invalid input.",
      ),

      // Address & Contact
      primaryContact: TextInput(true, 1, 25).regex(/^\d+$/, "Invalid input."),

      secondaryContact: TextInput(false, 0, 25)
        .refine(
          (value) => value === "" || /^\d+$/.test(value),
          "Invalid input.",
        )
        .optional(),

      fullAddress: TextInput(true, 1, 175),

      // Employment Details
      plantilla: SelectInputOptional.optional(),

      department: SelectInputOptional.optional(),

      isDepartmentHead: z.boolean(),

      division: SelectInputOptional.optional(),

      isDivisionHead: z.boolean(),

      category: SelectInputRequired,

      status: SelectInputRequired,

      civil_eligibility: TextInput(false, 0, 75)
        .refine(
          (value) => value === "" || /^[A-Za-zÀ-ÿ\s'-]+$/.test(value),
          "Invalid input.",
        )
        .optional(),

      // Educational Attainment
      bachelor_school: TextInput(true, 1, 100).regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        "Invalid input.",
      ),
      bachelor_title: TextInput(true, 1, 100).regex(
        /^[A-Za-zÀ-ÿ\s'-]+$/,
        "Invalid input.",
      ),

      bachelor_start: school_start,

      bachelor_end: school_end,

      bachelor_studying: z.boolean(),

      // Masteral
      masteral_school: educationLevelStatus.masteral
        ? TextInput(true, 1, 100).regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Invalid input.")
        : z.string(),

      masteral_title: educationLevelStatus.masteral
        ? TextInput(true, 1, 100).regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Invalid input.")
        : z.string(),

      masteral_start: educationLevelStatus.masteral ? school_start : z.string(),

      masteral_end: educationLevelStatus.masteral ? school_end : z.string(),

      masteral_studying: z.boolean(),
      // Doctorate
      doctorate_school: educationLevelStatus.doctorate
        ? TextInput(true, 1, 100).regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Invalid input.")
        : z.string(),

      doctorate_title: educationLevelStatus.doctorate
        ? TextInput(true, 1, 100).regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Invalid input.")
        : z.string(),

      doctorate_start: educationLevelStatus.doctorate
        ? school_start
        : z.string(),

      doctorate_end: educationLevelStatus.doctorate ? school_end : z.string(),

      doctorate_studying: z.boolean(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirm_password) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Password do not match",
          path: ["confirm_password"],
        });
      }
      if (data.isDepartmentHead && data.isDivisionHead) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message:
            "User cannot be head of department and division simultaneously.",
          path: ["division"],
        });
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message:
            "User cannot be head of department and division simultaneously.",
          path: ["department"],
        });
      }
      if (data.bachelor_studying && data.bachelor_end) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "das",
          path: ["bachelor_end"],
        });
      }
    });
};

export type NewSchemaAddEmployeeType = z.infer<
  ReturnType<typeof NewSchemaAddEmployee>
>;
