import { useTranslations } from "next-intl";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  required: boolean;
  className?: string;
  registrationName: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  register,
  error,
  required,
  className,
  registrationName,
}) => {
  const tCommon = useTranslations("Common");

  const rules: RegisterOptions = {
    required: required
      ? `${tCommon("requiredFieldMessage", { 0: capitalize(label) })}`
      : false,
  };

  if (type === "email") {
    rules.pattern = {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: tCommon("invalidEmailMessage"),
    };
  }

  return type === "textarea" ? (
    <>
      <textarea
        placeholder={placeholder}
        {...register(registrationName, rules)}
        rows={4}
        className={`${className} ${
          error ? "border-red-900" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-900 text-sm">{error}</span>}
    </>
  ) : (
    <>
      <input
        type={type}
        placeholder={placeholder}
        {...register(registrationName, rules)}
        className={`${className} ${
          error ? "border-red-900" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-900 text-sm">{error}</span>}
    </>
  );
};

export default FormInput;

function capitalize(label: string) {
  return label.charAt(0).toUpperCase() + label.slice(1);
}
