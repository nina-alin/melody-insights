const SearchBar = () => (
  <form>
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </div>

      <input
        className="border-slate-200 decoration-slate-200 block w-full rounded-2xl border bg-gray-800 p-4 px-2 py-1 pl-10 text-sm hover:border-green-500 focus:border-2 focus:border-green-500 focus:outline-none"
        disabled
        id="default-search"
        placeholder="Search..."
        type="search"
      />
    </div>
  </form>
);

export default SearchBar;
