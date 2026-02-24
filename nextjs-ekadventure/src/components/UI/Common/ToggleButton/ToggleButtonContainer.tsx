import ToggleButton from "./page";

const ToggleButtonContainer: React.FC<{
  label: string;
  enabled: boolean;
  onChange: () => void;
  disabled?: boolean;
}> = ({ label, enabled, onChange, disabled = false }) => {
  return (
    <div className="flex items-center gap-1">
      <ToggleButton enabled={enabled} onChange={onChange} disabled={disabled} />
      <span className="text-[13px] leading-5 text-text-dark">{label}</span>
    </div>
  );
};

export default ToggleButtonContainer;