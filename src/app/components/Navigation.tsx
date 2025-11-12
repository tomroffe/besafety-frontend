import { DarkThemeToggle, Button } from "flowbite-react";
import Logo from "@/components/Logo"

export default function Navigation() {

  return (
    <nav className="relative flex flex-col items-center sm:flex-row sm:items-center sm:justify-between p-3 px-6 mt-4 mb-4 text-white bg-gray-100 dark:bg-gray-800">
      {/* Left spacer only visible on sm+ */}
      <div className="hidden sm:flex sm:flex-1"></div>

      {/* Logo */}
      <div className="mb-4 sm:mb-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 text-7xl font-semibold">
        <a href='/'><Logo className='h-24 text-7xl' /></a>
      </div>

      {/* Right-aligned items: Language Selector and Theme Toggle */}
      <div className="flex items-center justify-center sm:justify-start space-x-2 w-full sm:w-auto">
        <Button href="/login" type="button" className="h-11">
          Login
        </Button>
        <DarkThemeToggle className="border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 focus:ring-0 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-11 w-11 " />
      </div>
    </nav>
  )
}
