const SubmitStatus: React.FC<{
  message: string;
  type: string;
  textColor?: string;
}> = ({ message, type, textColor }) => {
  return (
    <div
      className={`p-2 font-bold text-[12px] text-center ${
        type === "success"
          ? `${textColor} border-[1px] border-red-900`
          : "text-red-900"
      }`}
    >
      {message}
    </div>
  );
};

export default SubmitStatus;
