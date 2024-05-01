import { Link } from "react-router-dom";

const UserLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      to={href}
      className="font-extrabold border-b border-black my-1 w-full"
    >
      {children}
    </Link>
  );
};

export default UserLink;
