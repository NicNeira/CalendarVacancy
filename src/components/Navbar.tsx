import { ToogleButton } from "./ToogleButton";

export const Navbar = () => {
  return (
    <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          {/* <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              🏝️ Vacancy Planner
            </h1>
          </div> */}

          {/* Navigation Links - Add more as needed */}
          {/* <div className="hidden sm:flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
            >
              Calendar
            </a>
          </div> */}

          {/* Dark Mode Toggle */}
          <div className="flex items-center">
            <ToogleButton />
          </div>
        </div>
      </nav>
    </header>
  );
};
