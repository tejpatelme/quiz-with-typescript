export default function QuizTopic() {
  return (
    <div className="rounded overflow-hidden ">
      <div className="relative h-5/6">
        <img
          className="w-full h-auto"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
          alt="card-bg"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-gray-800 bg-opacity-60 flex items-center justify-center">
          <p className="text-lg font-semibold text-white">UX Fundamentals</p>
        </div>
      </div>
      <button className="text-lg italic font-bold text-center text-white bg-purple-500 w-full p-2">
        PLAY QUIZ {">"}
        {">"}
        {">"}
      </button>
    </div>
  );
}
