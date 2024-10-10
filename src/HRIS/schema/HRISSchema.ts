import { number, z, ZodIssueCode } from "zod";
import { EducationLevels, MimeFileType } from "../../utils/Globals";

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

const SelectInput = (required: boolean) => {
  if (required) {
    return z
      .string()
      .trim()
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
  } else {
    return z
      .string()
      .trim()
      .refine(
        (value) =>
          value === "none" || z.string().uuid().safeParse(value).success,
        "Invalid input.",
      );
  }
};

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

const singleFile = (
  required: boolean,
  fileFormat: string[] = [
    MimeFileType.PDF,
    MimeFileType.JPEG,
    MimeFileType.PNG,
  ],
  invalidFileType: string = "File must be PDF or an image (JPEG, PNG).",
) => {
  return z
    .instanceof(FileList, { message: "Input is not a file." })
    .superRefine((file, ctx) => {
      if (required && file.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "File required.",
        });
      }
      if (file.length === 1) {
        if (!fileFormat.includes(file[0].type)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: invalidFileType,
          });
        }
      } else if (file.length > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Maximum 1 file.",
        });
      }
    });
};

const multipleFile = (
  required: boolean,
  fileFormat: string[] = [
    MimeFileType.PDF,
    MimeFileType.JPEG,
    MimeFileType.PNG,
  ],
  invalidFileType: string = "File must be PDF or an image (JPEG, PNG).",
) => {
  return z
    .instanceof(FileList, { message: "Input is not a file." })
    .superRefine((file, ctx) => {
      if (required && file.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "This field is required.",
        });
        return;
      }

      if (file.length > 0) {
        if (file.length > 10) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Maximum 10 files.",
          });
          return;
        }

        const isFilesInvalid = Array.from(file).some((f) => {
          if (!fileFormat.includes(f.type)) {
            return true;
          }
        });

        if (isFilesInvalid) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: invalidFileType,
          });
        }
      }
    });
};

export const AddEmployeeSchema = (educationLevelStatus: EducationLevels) =>
  z
    .object({
      // Account Information
      employee_number: TextInput(true, 1, 50),

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

      //Address & Contact
      primaryContact: TextInput(true, 1, 25).regex(/^\d+$/, "Invalid input."),

      secondaryContact: TextInput(false, 0, 25)
        .refine(
          (value) => value === "" || /^\d+$/.test(value),
          "Invalid input.",
        )
        .optional(),

      fullAddress: TextInput(true, 1, 175),

      // Employment Details
      plantilla: SelectInput(false).optional(),

      department: SelectInput(false).optional(),

      category: SelectInput(true),

      status: SelectInput(true),

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

      // Government numbers
      sss: TextInput(true, 1, 25).regex(/^[\d]+$/, "Invalid input."),

      bir_tin: TextInput(true, 1, 25).regex(/^[\d]+$/, "Invalid input."),

      gsis: TextInput(true, 1, 25).regex(/^[\d]+$/, "Invalid input."),

      pagibig: TextInput(true, 1, 25).regex(/^[\d]+$/, "Invalid input."),

      philhealth: TextInput(true, 1, 25).regex(/^[\d]+$/, "Invalid input."),

      // Documents
      resume: singleFile(true),

      pds: singleFile(true),

      tor_bachelor: singleFile(false),

      diploma_bachelor: singleFile(false),

      tor_master: educationLevelStatus.masteral
        ? singleFile(false)
        : z.string().default("").optional(),

      diploma_master: educationLevelStatus.masteral
        ? singleFile(false)
        : z.string().default("").optional(),

      tor_doctorate: educationLevelStatus.doctorate
        ? singleFile(false)
        : z.string().default("").optional(),

      diploma_doctorate: educationLevelStatus.doctorate
        ? singleFile(false)
        : z.string().default("").optional(),

      ptt: singleFile(false),

      certificates: multipleFile(false),

      mpo: singleFile(false),

      cccr: singleFile(false),

      csc_eligibility: singleFile(false),

      birth_certificate: singleFile(true),

      marriage_contract: singleFile(false),

      medical_requirements: multipleFile(false),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password do not match.",
          path: ["confirm_password"],
        });
      }

      if (!data.bachelor_studying) {
        if (data.bachelor_end == null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Year is required.",
            path: ["bachelor_end"],
          });
        }
        if (!isNaN(Number(data.bachelor_end))) {
          if (Number(data.bachelor_end) < data.bachelor_start) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Year cannot be lower than start year.",
              path: ["bachelor_end"],
            });
          }
        } else {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid input.",
            path: ["bachelor_end"],
          });
        }
      } else {
        if (data.bachelor_end != null) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Cannot add year if currently studying.",
            path: ["bachelor_end"],
          });
        }
      }

      if (data.masteral_studying === false && educationLevelStatus.masteral) {
        let isStartNumber = !isNaN(Number(data.masteral_end))
          ? Number(data.masteral_start)
          : false;
        let isEndNumber = !isNaN(Number(data.masteral_start))
          ? Number(data.masteral_end)
          : false;
        if (isStartNumber && isEndNumber) {
          if (isStartNumber > isEndNumber) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Year cannot be lower than start year.",
              path: ["masteral_end"],
            });
          }
        }
      }

      if (educationLevelStatus.doctorate) {
        let isStartNumber = !isNaN(Number(data.doctorate_end))
          ? Number(data.doctorate_start)
          : false;
        let isEndNumber = !isNaN(Number(data.doctorate_start))
          ? Number(data.doctorate_end)
          : false;
        if (isStartNumber && isEndNumber) {
          if (isStartNumber > isEndNumber) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Year cannot be lower than start year.",
              path: ["doctorate_end"],
            });
          }
        }
      }
    });
// const school_end = z
//   .string()
//   .trim()
//   .max(4, "Invalid year.")
//   .transform((value) => {
//     return value === "" ? null : Number(value);
//   });
export type AddEmployeeType = z.infer<ReturnType<typeof AddEmployeeSchema>>;

// z.instanceof(FileList, { message: "Input is not a file." }).superRefine(
//   (file, ctx) => {
//     let validFormats = [MimeFileType.PDF, MimeFileType.JPEG, MimeFileType.PNG];

//     if (file.length === 1) {
//       if (!validFormats.includes(file[0].type)) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "File must be PDF or an image (JPEG, PNG).",
//         });
//       }
//     } else if (file.length > 1) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "Maximum 1 file.",
//       });
//     } else {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "PSA Birth certificate is required.",
//       });
//     }
//   },
// );

// const multipleFile = (
//   optional: boolean = false,
//   fileFormat: string[] = [
//     MimeFileType.PDF,
//     MimeFileType.JPEG,
//     MimeFileType.PNG,
//   ],
//   invalidFileType: string = "File must be PDF or an image (JPEG, PNG).",
// ) => {
//   return z
//     .instanceof(FileList, { message: "Input is not a file." })
//     .superRefine((file, ctx) => {
//       if (!optional && file.length === 0) {
//         ctx.addIssue({
//           code: z.ZodIssueCode.custom,
//           message: "This field is required.",
//         });
//         return;
//       }

//       if (file.length > 0) {
//         if (file.length > 10) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: "Maximum 10 files.",
//           });
//           return;
//         }

//         const isFilesInvalid = Array.from(file).some((f) => {
//           if (!fileFormat.includes(f.type)) {
//             return true;
//           }
//         });

//         if (isFilesInvalid) {
//           ctx.addIssue({
//             code: z.ZodIssueCode.custom,
//             message: invalidFileType,
//           });
//         }
//       }
//     });
// };
