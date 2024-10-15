import { z, ZodIssueCode } from "zod";
import {
  BIR_TIN,
  EducationLevels,
  Email,
  EmployeeNumbers,
  GSIS,
  Pagibig,
  PhilHealth,
  PrimaryContacts,
  SSS,
} from "../../utils/Globals";

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
    return value === "" || isNaN(Number(value)) ? "" : Number(value);
  });

export const NewSchemaAddEmployee = (
  employeeNumberList: EmployeeNumbers[],
  educationLevelStatus: EducationLevels,
  emailList: Email[],
  sssList: SSS[],
  tinList: BIR_TIN[],
  gsisList: GSIS[],
  pagibigList: Pagibig[],
  philHealthList: PhilHealth[],
  primaryContactList: PrimaryContacts[],
) => {
  return z
    .object({
      // Account Information
      employee_number: TextInput(true, 1, 50).refine(
        (value) =>
          !employeeNumberList.some((field) => value === field.employee_number),
        "Employee number already exists.",
      ),
      email: TextInput(true, 1, 80)
        .email("Invalid email format.")
        .refine(
          (value) => !emailList.some((field) => value === field.email),
          "Email already exists.",
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

      gender: TextInput(true, 1, 10).refine(
        (value) => value === "Male" || value === "Female",
        "This field is required.",
      ),

      birthday: TextInput(true, 1, 25).refine(
        (value) => !isNaN(Date.parse(value)),
        "Invalid input.",
      ),

      // Address & Contact
      primaryContact: TextInput(true, 1, 25)
        .regex(/^\d+$/, "Invalid input.")
        .refine(
          (value) =>
            !primaryContactList.some(
              (field) => field.primary_contact === value,
            ),
          "Contact number already exists.",
        ),

      secondaryContact: TextInput(false, 0, 25)
        .refine(
          (value) => value === "" || /^\d+$/.test(value),
          "Invalid input.",
        )
        .optional(),

      fullAddress: TextInput(true, 1, 175),

      // Employment Details
      plantilla: SelectInputOptional.optional(),

      department: SelectInputRequired,

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
        : z.literal(""),

      masteral_title: educationLevelStatus.masteral
        ? TextInput(true, 1, 100).regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Invalid input.")
        : z.literal(""),

      masteral_start: educationLevelStatus.masteral
        ? z
            .string()
            .trim()
            .min(1, "This field is required.")
            .max(4, "Invalid year.")
            .transform((value) => {
              return value === "" || isNaN(Number(value)) ? "" : Number(value);
            })
        : z.literal(""),

      masteral_end: educationLevelStatus.masteral ? school_end : z.literal(""),

      masteral_studying: z.boolean(),

      // Doctorate
      doctorate_school: educationLevelStatus.doctorate
        ? TextInput(true, 1, 100).regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Invalid input.")
        : z.literal(""),

      doctorate_title: educationLevelStatus.doctorate
        ? TextInput(true, 1, 100).regex(/^[A-Za-zÀ-ÿ\s'-]+$/, "Invalid input.")
        : z.literal(""),

      doctorate_start: educationLevelStatus.doctorate
        ? z
            .string()
            .trim()
            .min(1, "This field is required.")
            .max(4, "Invalid year.")
            .transform((value) => {
              return value === "" || isNaN(Number(value)) ? "" : Number(value);
            })
        : z.literal(""),

      doctorate_end: educationLevelStatus.doctorate
        ? school_end
        : z.literal(""),

      doctorate_studying: z.boolean(),

      // Government Numbers
      sss: TextInput(true, 1, 25)
        .regex(/^[\d]+$/, "Invalid input.")
        .refine(
          (value) => !sssList.some((field) => value === field.sss),
          "SSS number already exists.",
        ),

      bir_tin: TextInput(true, 1, 25)
        .regex(/^[\d]+$/, "Invalid input.")
        .refine(
          (value) => !tinList.some((field) => value === field.bir_tin),
          "BIR/TIN number already exists.",
        ),

      gsis: TextInput(true, 1, 25)
        .regex(/^[\d]+$/, "Invalid input.")
        .refine(
          (value) => !gsisList.some((field) => value === field.gsis),
          "GSIS number already exists.",
        ),

      pagibig: TextInput(true, 1, 25)
        .regex(/^[\d]+$/, "Invalid input.")
        .refine(
          (value) => !pagibigList.some((field) => value === field.pagibig),
          "PagIbig number already exists.",
        ),

      philhealth: TextInput(true, 1, 25)
        .regex(/^[\d]+$/, "Invalid input.")
        .refine(
          (value) =>
            !philHealthList.some((field) => value === field.philhealth),
          "PhilHealth number already exists.",
        ),
    })
    .superRefine((data, ctx) => {
      // Check if password matches confirm password
      if (data.password !== data.confirm_password) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Password do not match",
          path: ["confirm_password"],
        });
      }

      // Check if both assign head and division are true
      if (data.isDepartmentHead && data.isDivisionHead) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message:
            "User cannot be a department head and division head simultaneously.",
          path: ["department"],
        });
      }

      // Check if bachelor year end status is not specified
      if (data.bachelor_end === "" && !data.bachelor_studying) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "This field is required.",
          path: ["bachelor_end"],
        });
      }

      // Check if masteral year end status is not specified
      if (
        educationLevelStatus.masteral &&
        data.masteral_end === "" &&
        !data.masteral_studying
      ) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "This field is required.",
          path: ["masteral_end"],
        });
      }

      // Check if doctorate year end status is not specified
      if (
        educationLevelStatus.doctorate &&
        data.doctorate_end === "" &&
        !data.doctorate_studying
      ) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "This field is required.",
          path: ["doctorate_end"],
        });
      }

      // Check if bachelor start is greater than bachelor end
      if (!data.bachelor_studying) {
        if (data.bachelor_end && data.bachelor_end < data.bachelor_start) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: "End year cannot be lower than start year.",
            path: ["bachelor_end"],
          });
        }
      }

      // Check if masteral start is less than bachelor end
      if (
        data.bachelor_end &&
        data.masteral_start &&
        data.masteral_start < data.bachelor_end
      ) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Start year cannot be less than bachelor end year.",
          path: ["masteral_start"],
        });
      }

      // Check if masteral start is greater than masteral end
      if (
        data.masteral_start &&
        data.masteral_end &&
        data.masteral_end < data.masteral_start
      ) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "End year cannot be lower than start year.",
          path: ["masteral_end"],
        });
      }

      // Check if doctorate start is less than masteral end
      if (
        data.masteral_end &&
        data.doctorate_start &&
        data.doctorate_start < data.masteral_end
      ) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Start year cannot be less than bachelor end year.",
          path: ["doctorate_start"],
        });
      }

      // Check if doctorate start is greater than doctorate end
      if (
        data.doctorate_start &&
        data.doctorate_end &&
        data.doctorate_end < data.doctorate_start
      ) {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "End year cannot be lower than start year.",
          path: ["doctorate_end"],
        });
      }
    });
};

export type NewSchemaAddEmployeeType = z.infer<
  ReturnType<typeof NewSchemaAddEmployee>
>;
