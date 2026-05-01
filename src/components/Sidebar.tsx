import LogoutButton from "./LogoutButton";

interface Props {
  pages: string[];
  user: string;
}

function Sidebar({ pages, user }: Props) {
  return (
    <>
      <div
        className="bg-primary text-light d-flex flex-column vh-100 p-3"
        style={{ width: "250px" }}
      >
        {/* Welcome, user header */}
        <div className="text-light h2">Welcome, {user}</div>
        <hr />

        {/* Make a li for every page available to user */}
        <ul className="nav flex-column nav-underline">
          {pages.map((page) => (
            <li className="nav-item" key={page.replace(/[ /-]/g, "")}>
              <a
                className="nav-link text-white fs-6"
                href={page.replace(/[ /-]/g, "")}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>

        {/* Logout button at bottom*/}
        <div className="mt-auto">
          <hr />
          <div className="d-flex justify-content-center pb-3">
            <LogoutButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
