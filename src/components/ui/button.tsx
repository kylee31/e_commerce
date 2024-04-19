const Button = ({
  type,
  text,
  onClick,
}: {
  type: "button" | "reset" | "submit" | undefined;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type={type}
      className="w-full h-8 flex justify-center items-center bg-black text-white rounded-md font-bold"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
