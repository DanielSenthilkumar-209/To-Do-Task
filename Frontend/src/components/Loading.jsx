import { ImSpinner9 } from "react-icons/im";

function Loading() {
  return (
    <div className="w-screen h-screen flex flex-col items-center mt-[20%]">
    <p className="flex text-5xl animate-spin w-12 h-12">
    <ImSpinner9 />
    </p>
    </div>
  )
}

export default Loading;
