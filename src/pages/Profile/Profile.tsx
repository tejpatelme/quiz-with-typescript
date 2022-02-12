import { useAuth } from "../../context/auth-context";

export default function Profile() {
  const { state } = useAuth();
  return (
    <>
      {state?.authenticatedUser && (
        <div className="p-4 sm:p-7 max-w-sm w-full">
          <span className="text-sm text-gray-300 mb-2 block">Name</span>
          <div className="bg-gray-800 bg-opacity-60 rounded text-white w-full px-4 py-2 mb-5">
            {state.authenticatedUser?.name}
          </div>
          <span className="text-sm text-gray-300 mb-2 block">Email</span>
          <div className="bg-gray-800 bg-opacity-60 rounded text-white w-full px-4 py-2 mb-5">
            {state.authenticatedUser?.email}
          </div>
        </div>
      )}
    </>
  );
}
