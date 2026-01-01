import { useState, useEffect } from "react";

const Page1 = () => {
  const [users, setUsers] = useState([]);
  const [phim, setPhim] = useState("World War Z");
  const [input, setInput] = useState("World War Z");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(phim)}&apikey=3477c8f&`);

        if (!res.ok) throw new Error("Lỗi !");

        const data = await res.json();

        if (data.Response === "False") {
        throw new Error(data.Error);
        }

        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (phim.trim() !== "") {
    fetchUsers();
    }
  }, [phim]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Lỗi: {error}</p>;

  const firstGenre = users?.Genre.split(", ")[0];
  const SecondGenre = users?.Genre.split(", ")[1];
  const ThirdGenre = users?.Genre.split(", ")[2];

  return (
    <div className="container max-w-screen min-h-screen h-100 flex flex-col">
      <header className="flex justify-between bg-red-600 items-center p-4 h-1/8">
        <h1 className="font-semibold text-lg text-yellow-100">
          {" "}
          ESGUMBALL - CINEMA{" "}
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tên phim bạn muốn tìm"
            className="bg-amber-200 rounded w-75 p-2 outline-none hover:bg-amber-300"
          ></input>
          <button 
          onClick={() => setPhim(input)}
          className="rounded bg-amber-200 p-2 font-semibold cursor-pointer hover:bg-amber-300">
            Tìm kiếm
          </button>
        </div>
        <button className="font-semibold cursor-pointer rounded p-2 bg-amber-200">
          {" "}
          Đặt vé ngay{" "}
        </button>
      </header>
      <section className="bg-red-300 min-w-screen h-full py-10">
        <div className=" flex flex-col space-y-2">
          <div className="flex mx-100 text-center">
            <div className=" w-2/3 px-17">
              <img src={users?.Poster} className="w-80"/>
            </div>
            <div className="flex flex-col w-1/2 space-y-4">
              <h1 className="text-5xl font-bold"> {users?.Title} </h1>
              <h1 className="text-lg font-semibold"> Điểm đánh giá : {users?.imdbRating}</h1>
              <div className="flex text-gray-500 justify-center gap-5">
                <h1> {users?.Rated} </h1>
                <h1> {users?.Year} </h1>
                <h1> {users?.Runtime} </h1>
              </div>
              <div className="flex justify-between gap-10">
                <h1 className="border p-1 rounded-xl w-full"> {firstGenre} </h1>
                <h1 className="border p-1 rounded-xl w-full"> {SecondGenre} </h1>
                <h1 className="border p-1 rounded-xl w-full"> {ThirdGenre} </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-col mx-100 text-left">
            <div>
              <h1 className="font-semibold"> Plot : </h1>
              <h1 className="text-gray-600"> "{users?.Plot}" </h1>
            </div>
            <div>
              <h1 className="font-semibold"> Cast : </h1>
              <h1 className="text-gray-600"> "{users?.Actors}" </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page1;
