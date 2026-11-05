import React, { useState } from 'react';
import { Link } from 'react-router';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  dob: string;
  age: string | number;
  city: string;
  state: string;
  country: string;
  errors: { [key: string]: string };
}

export const DynamicForm: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: Date.now(),
      firstName: '',
      lastName: '',
      dob: '',
      age: '',
      city: '',
      state: '',
      country: '',
      errors: {},
    },
  ]);

  const addUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUsers((prevUsers) => [
      ...prevUsers,
      {
        id: Date.now() + Math.random(),
        firstName: '',
        lastName: '',
        dob: '',
        age: '',
        city: '',
        state: '',
        country: '',
        errors: {},
      },
    ]);
  };

  const deleteUser = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault();
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, field: keyof User) => {
    const { value } = e.target;
    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === id) {
          const updatedUser = { ...user, [field]: value };
          if (field === 'dob') {
            return calculateAge(updatedUser);
          }
          return updatedUser;
        }
        return user;
      })
    );
  };

  const calculateAge = (user: User): User => {
    if (user.dob) {
      const dob = new Date(user.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      return { ...user, age: age >= 0 ? age : '' };
    }
    return user;
  };

  const validateInput = (user: User): User => {
    let newErrors: { [key: string]: string } = {};

    ['firstName', 'lastName', 'city', 'state', 'country'].forEach((field) => {
      const val = user[field as keyof User] as string;
      if (!val || val.trim().length < 2) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least 2 characters.`;
      }
    });

    if (!user.dob) {
      newErrors.dob = 'Please enter a valid date of birth.';
    } else if (typeof user.age === 'number' && user.age < 18) {
      newErrors.dob = 'You must be at least 18 years old.';
    }

    return { ...user, errors: newErrors };
  };

  const handleBlur = (id: number) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? validateInput(user) : user))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isFormValid = true;
    const validatedUsers = users.map((user) => {
      const validatedUser = validateInput(user);
      if (Object.keys(validatedUser.errors).length > 0) {
        isFormValid = false;
      }
      return validatedUser;
    });
    setUsers(validatedUsers);

    if (isFormValid) {
      console.log('Form is valid and ready to submit!');
      console.log(users);
    } else {
      console.log('Form has validation errors.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <section className="py-12 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header & Back Link */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline mb-3"
            >
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </Link>
            <div className="text-center space-y-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                User Information Form
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Add multiple user profiles with real-time validation and automatic age calculation.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center font-bold">
                        #{index + 1}
                      </span>
                      User Profile
                    </h3>
                    {users.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => deleteUser(e, user.id)}
                        className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer"
                        title="Remove User"
                      >
                        <i className="fa-solid fa-trash-can text-sm"></i>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">First Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <i className="fa-solid fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="First Name"
                          value={user.firstName}
                          onChange={(e) => handleChange(e, user.id, 'firstName')}
                          onBlur={() => handleBlur(user.id)}
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm text-slate-900 dark:text-white focus:outline-none ${
                            user.errors.firstName
                              ? 'border-red-500'
                              : user.firstName.length > 0
                              ? 'border-emerald-500'
                              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                          }`}
                        />
                      </div>
                      {user.errors.firstName && (
                        <p className="text-xs text-red-500 mt-1">{user.errors.firstName}</p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Last Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <i className="fa-solid fa-user"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={user.lastName}
                          onChange={(e) => handleChange(e, user.id, 'lastName')}
                          onBlur={() => handleBlur(user.id)}
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm text-slate-900 dark:text-white focus:outline-none ${
                            user.errors.lastName
                              ? 'border-red-500'
                              : user.lastName.length > 0
                              ? 'border-emerald-500'
                              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                          }`}
                        />
                      </div>
                      {user.errors.lastName && (
                        <p className="text-xs text-red-500 mt-1">{user.errors.lastName}</p>
                      )}
                    </div>

                    {/* DOB */}
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Date of Birth</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <i className="fa-solid fa-calendar"></i>
                        </span>
                        <input
                          type="date"
                          value={user.dob}
                          onChange={(e) => handleChange(e, user.id, 'dob')}
                          onBlur={() => handleBlur(user.id)}
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm text-slate-900 dark:text-white focus:outline-none ${
                            user.errors.dob
                              ? 'border-red-500'
                              : user.dob.length > 0
                              ? 'border-emerald-500'
                              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                          }`}
                        />
                      </div>
                      {user.errors.dob && (
                        <p className="text-xs text-red-500 mt-1">{user.errors.dob}</p>
                      )}
                    </div>

                    {/* Age */}
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Age</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <i className="fa-solid fa-cake-candles"></i>
                        </span>
                        <input
                          type="number"
                          placeholder="Age"
                          value={user.age}
                          readOnly
                          className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">City</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <i className="fa-solid fa-city"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="City"
                          value={user.city}
                          onChange={(e) => handleChange(e, user.id, 'city')}
                          onBlur={() => handleBlur(user.id)}
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm text-slate-900 dark:text-white focus:outline-none ${
                            user.errors.city
                              ? 'border-red-500'
                              : user.city.length > 0
                              ? 'border-emerald-500'
                              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                          }`}
                        />
                      </div>
                      {user.errors.city && (
                        <p className="text-xs text-red-500 mt-1">{user.errors.city}</p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">State</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <i className="fa-solid fa-map-location-dot"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="State"
                          value={user.state}
                          onChange={(e) => handleChange(e, user.id, 'state')}
                          onBlur={() => handleBlur(user.id)}
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm text-slate-900 dark:text-white focus:outline-none ${
                            user.errors.state
                              ? 'border-red-500'
                              : user.state.length > 0
                              ? 'border-emerald-500'
                              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                          }`}
                        />
                      </div>
                      {user.errors.state && (
                        <p className="text-xs text-red-500 mt-1">{user.errors.state}</p>
                      )}
                    </div>

                    {/* Country */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">Country</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                          <i className="fa-solid fa-globe"></i>
                        </span>
                        <input
                          type="text"
                          placeholder="Country"
                          value={user.country}
                          onChange={(e) => handleChange(e, user.id, 'country')}
                          onBlur={() => handleBlur(user.id)}
                          className={`w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm text-slate-900 dark:text-white focus:outline-none ${
                            user.errors.country
                              ? 'border-red-500'
                              : user.country.length > 0
                              ? 'border-emerald-500'
                              : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                          }`}
                        />
                      </div>
                      {user.errors.country && (
                        <p className="text-xs text-red-500 mt-1">{user.errors.country}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={addUser}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-semibold text-sm transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-user-plus text-indigo-500"></i>
                <span>Add Another User</span>
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-check"></i>
                <span>Submit All Profiles</span>
              </button>
            </div>
          </form>

        </div>
      </section>
    </div>
  );
};

export default DynamicForm;