import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import { useSearchParams } from "react-router-dom"

type HomeNavigationProps = {
  totalPages: number
}

const HomePagination = ({ totalPages }: HomeNavigationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get("page")) || 1

  const hasNext = page < totalPages
  const hasPrev = page > 1

  const handleNext = () => {
    const params = new URLSearchParams(searchParams)

    params.set("page", String(page + 1))

    setSearchParams(params)
  }

  const handlePrev = () => {
    const params = new URLSearchParams(searchParams)

    params.set("page", String(page - 1))

    setSearchParams(params)
  }

  return (
    <>
      <Pagination>
        <PaginationContent>
          {hasPrev && (
            <PaginationItem>
              <PaginationPrevious onClick={() => handlePrev()} />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>

          {hasNext && (
            <PaginationItem>
              <PaginationNext onClick={() => handleNext()} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default HomePagination
