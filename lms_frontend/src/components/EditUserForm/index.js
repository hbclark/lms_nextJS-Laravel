"use client";
import { useFormState } from "react-dom";
import { updateUser } from "@/api/user";


export default function EditUserForm({ user }) {
  const [state, formAction] = useFormState(updateUser, {});

  return (
    <>
    {state?.success && (
        <div
          className="mt-10 bg-green-100 border border-green-400 text-green-700 text-xl px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <strong className="font-bold">😃{state.success}</strong>
          <span className="ml-1 block sm:inline">{state.message};</span>
        </div>
      )}
      <form
        action={formAction}
        className="w-6/12 mx-auto mt-10 h-100 p-10  border border-solid border-gray-400 rounded-xl shadow"
      >
        <h2 className="text-center text-3xl font-semibold leading-7">
          Edit User
        </h2>
        
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm  sm:max-w-md">
                <input type="hidden" name="id" value={user.id} />
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-green-600/30 sm:text-sm sm:leading-6"
                  disabled
                  defaultValue={user.email}
                
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="firstName"
                id="firstName"
                autoComplete="firstName"
                className="block w-full rounded-md border-0 py-1.5 pl-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-green-300 sm:text-sm sm:leading-6"
                required
                defaultValue={user.firstName}
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lastName"
                id="lastName"
                autoComplete="lastName"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 pl-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
                defaultValue={user.lastName}
              />
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="Password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="Password"
                autoComplete="Password"
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              confirmPassword
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                autoComplete="confirmPassword"
                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
            </div>
          </div>
        </div>

        {state?.errors && (
          <ul className="mt-4 text-red-500 text-sm">
            {Object.entries(state.errors).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        )}

        <button
          href="/login"
          className="block mt-4 mx-auto text-center rounded-md bg-indigo-800 px-3 py-2 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Update
        </button>
      </form>
    </>
  );
}
