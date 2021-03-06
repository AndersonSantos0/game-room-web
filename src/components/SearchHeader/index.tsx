import { useRouter } from 'next/router'
import { useState } from 'react'
import { RiSearch2Line } from 'react-icons/ri'
import Logo from '../Logo'
import { SearchHeaderContainer } from './styles'

interface SearchHeaderProps {
  fixed?: boolean
}

const SearchHeader = ({ fixed = false }: SearchHeaderProps) => {
  const { push } = useRouter()
  const [searchValue, setSearchValue] = useState('')

  const Search = () => {
    if (!searchValue.trim()) return
    push('/search/game/' + searchValue, null)
  }

  return (
    <SearchHeaderContainer fixed={fixed}>
      <Logo size="2rem" />
      <form
        onSubmit={e => {
          e.preventDefault()
          Search()
        }}
      >
        <input
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          placeholder="Search"
          type="text"
        />
        <button type="submit">
          <RiSearch2Line size={'1.25rem'} />
        </button>
      </form>
    </SearchHeaderContainer>
  )
}

export default SearchHeader
