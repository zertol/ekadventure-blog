const ToggleButton: React.FC<{
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
}> = ({ enabled, onChange, disabled = false }) => {
  return (
    <button
      onClick={onChange}
      disabled={disabled}
      className={`relative w-11 h-[22px] rounded-full transition-all duration-300
        focus:ring-2 focus:ring-offset-2 focus:ring-background-green-accent ${
        enabled
          ? "bg-background-green-accent/60"
          : "bg-background-green-accent/30"
      } ${disabled ? "cursor-not-allowed" : "hover:bg-background-green-accent/40"}`}
      role="switch"
      aria-checked={enabled}
    >
      <span
        className={`bg-white absolute top-1/2 translate-y-[-50%] left-[4px] w-[16px] h-[16px] rounded-full transition-transform ${
          enabled ? "translate-x-5" : ""
        } ${disabled ? "bg-white/50" : ""}`}
      />
    </button>
  );
};

export default ToggleButton;
