import { KeyboardEvent, useEffect, useRef } from "react";
import bookImg from "../assets/book.png";
import { iBook } from "../interface/common";
import { useGetAllGenreQuery, useGetBooksQuery } from "../redux/api/booksApi";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { setBooks } from "../redux/features/bookSlice";
const AllBook = () => {
  const search = useRef<HTMLInputElement>(null);
  const { books } = useAppSelector((state) => state.books);
  const dispatch = useAppDispatch();
  const { data } = useGetBooksQuery(undefined);
  useEffect(() => {
    dispatch(setBooks(data?.data));
  }, [data, dispatch]);

  const { data: genres } = useGetAllGenreQuery(undefined);
  const handleSearch = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      const searchValue = search.current?.value.toLowerCase();
      const newBooks = data?.data.filter((book: iBook) =>
        book.title.toLowerCase().includes(searchValue!)
      );
      dispatch(setBooks(newBooks));
    }
  };
  const handleFilter = (genre: string) => {
    const newBooks = data?.data.filter((book: iBook) =>
      book.genre.includes(genre)
    );
    dispatch(setBooks(newBooks));
  };

  return (
    <div>
      <div className="container">
        <div className="px-2">
          <h1 className="text-center text-3xl font-bold mb-5">All Books</h1>
          <div className="grid grid-cols-5 gap-5">
            <div className="col-span-1">
              <h2 className="mb-5">Filter with title:</h2>
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto block mb-5"
                ref={search}
                onKeyDown={handleSearch}
              />
                <h2 className="mb-5">Filter with genre:</h2>
              <div className="flex flex-wrap mt-5">
                {genres?.data.map((genre: { _id: string }, idx: number) => (
                  <p
                    className="p-1 border m-1 cursor-pointer"
                    onClick={() => handleFilter(genre._id)}
                    key={idx}
                  >
                    {genre._id}
                  </p>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-5 col-span-4">
              {books?.map((book: iBook) => (
                <div
                  className="card card-side bg-base-100 shadow-xl cursor-pointer border h-[185px]"
                  key={book._id}
                >
                  <figure>
                    <img src={bookImg} alt="Movie" className="w-[130px]" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{book.title} </h2>
                    <p>
                      {book.genre.map((genre, idx) => (
                        <span
                          className="badge badge-outline text-xs mr-1"
                          key={idx}
                        >
                          {genre}
                        </span>
                      ))}
                    </p>
                    <p className="text-[13px] font-bold">- {book.author}</p>
                    <p className="text-[13px] text-right">
                      {book.publicationDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBook;
