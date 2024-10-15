import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  singleInput: z
    .instanceof(FileList)
    .refine(
      (value) => value.length === 1 || value.length === 0,
      "Only one file.",
    ),
  sampleText: z
    .string()
    // .refine((value) => value === "none", "Message must be none")
    .transform((value) => (value === "none" ? "" : value))
    .refine((value) => value === "", "Message is not an empty string"),
});

type FormData = z.infer<typeof schema>;

const TestingTable = () => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("singleInput", data.singleInput[0]);
    formData.append("singleInput", data.sampleText);
    console.log(data);

    // try {
    //   await axios.post("/v1/testing/sampleRoute", formData, {
    //     headers: { "Content-Type": "multipart/form-data" },
    //   });
    // } catch (error) {}
  };

  const handleDownload = () => {
    window.open(
      `http://localhost:3000/documents/singleInput-1728485460882.pdf`,
      "_parent",
    );
  };

  useEffect(() => {
    console.log(getValues("sampleText"));
  }, [watch("sampleText"), onSubmit]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Single Input:</label>
          <input {...register("sampleText")} />
          {errors.sampleText && (
            <p className="text-red-400">{errors.sampleText.message}</p>
          )}
        </div>
        <div>
          <label>Single Input:</label>
          <input {...register("singleInput")} type="file" accept=".pdf" />
          {errors.singleInput && <p>{errors.singleInput.message}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDownload}>Download </button>
    </>
  );
};

export default TestingTable;
