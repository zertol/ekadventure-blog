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
  className
}) => {
  return type === "textarea" ? (
    <div>
      <textarea
        placeholder={placeholder}
        {...register(label, {
          required: required ? `${label} is required` : false,
        })}
        rows={4}
        className={`${className} ${
          error ? "border-red-900" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-900 text-sm">{error}</span>}
    </div>
  ) : (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        {...register(label, {
          required: required ? `${label} is required` : false,
        })}
        className={`${className} ${
          error ? "border-red-900" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-900 text-sm">{error}</span>}
    </div>
  );
};

export default FormInput;
