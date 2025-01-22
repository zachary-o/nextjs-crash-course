import React from "react"
import Form from "next/form"
import SearchFormReset from "./SearchFormReset"
import { Search } from "lucide-react"

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form className="search-form" scroll={false} action="/">
      <input
        className="search-input"
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button className="search-btn text-white" type="submit">
          <Search className="size-5" />
        </button>
      </div>
    </Form>
  )
}

export default SearchForm
