import { Link } from "react-router-dom";

const UserLink = ({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={href}
      className={`relative font-extrabold border-b border-black my-1 w-full `}
    >
      <div>
        {children}
        <span className={`absolute ${active ? "visible" : "hidden"}`}>✨</span>
      </div>
    </Link>
  );
};

export default UserLink;
