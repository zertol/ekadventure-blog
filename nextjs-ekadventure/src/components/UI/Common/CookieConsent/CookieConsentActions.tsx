const CookieConsentActions: React.FC<{
  actionsDict: Array<{
    label: string;
    onClick: () => void;
  }>;
}> = ({ actionsDict }) => {
  return (
    <>
      {actionsDict.map((action, index) => (
        <button
          key={index}
          onClick={action.onClick as () => void}
          className="bg-black text-white px-6 py-2 rounded-full hover:bg-background-green-accent active:bg-black transition-colors duration-300 text-[13px] font-medium whitespace-nowrap"
        >
          {action.label}
        </button>
      ))}
    </>
  );
};

export default CookieConsentActions;
