import bookImg from "../assets/book.png";
import { iBook } from "../interface/common";
import { useGetBooksQuery } from "../redux/api/booksApi";
const Home = () => {
  const {data} = useGetBooksQuery(undefined)
  return (
    <section>
      <div className="container">
      <div className="px-2 py-5 text-xl">
        <h1 className="underline mb-10">Recent added books</h1>
        <div className="grid grid-cols-3 gap-5">
        {data?.data?.slice(0,9).map((book: iBook) => (
                <div
                  className="card card-side bg-base-100 shadow-xl cursor-pointer border"
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
    </section>
  );
};

export default Home;
