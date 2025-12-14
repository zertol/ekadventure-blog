import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  required: boolean;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  register,
  error,
  required,
  className,
}) => {
  return type === "textarea" ? (
    <>
      <textarea
        placeholder={placeholder}
        {...register(label, {
          required: required ? `${capitalize(label)} is required` : false,
        })}
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
        {...register(label, {
          required: required ? `${capitalize(label)} is required` : false,
        })}
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
