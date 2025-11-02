import { UseFormRegister } from "react-hook-form";

interface ContactFormInputProps {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  required: boolean;
}

const ContactFormInput: React.FC<ContactFormInputProps> = ({
  label,
  type,
  placeholder,
  register,
  error,
  required,
}) => {
  return type === "textarea" ? (
    <div>
      <textarea
        placeholder={placeholder}
        {...register(label, {
          required: required ? `${label} is required` : false,
        })}
        rows={4}
        className={`contact-form-input ${
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
        className={`contact-form-input ${
          error ? "border-red-900" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-900 text-sm">{error}</span>}
    </div>
  );
};

export default ContactFormInput;
