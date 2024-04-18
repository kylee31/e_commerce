const Button = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return (
    <div
      className="w-full h-8 flex justify-center items-center bg-black text-white rounded-md font-bold"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
