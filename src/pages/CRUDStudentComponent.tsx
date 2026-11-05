import React, { useState } from 'react';
import { Link } from 'react-router';

interface Student {
  id: number;
  studentId: string;
  studentName: string;
  marks: string;
  location: string;
  standard: string;
}

interface FormData {
  studentId: string;
  studentName: string;
  marks: string;
  location: string;
  standard: string;
}

interface ValidationError {
  studentId: boolean;
  standard: boolean;
}

interface NotificationState {
  show: boolean;
  message: string;
}

export const CRUDStudentComponent: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<FormData>({
    studentId: '',
    studentName: '',
    marks: '',
    location: '',
    standard: ''
  });
  const [selectedRow, setSelectedRow] = useState<Student | null>(null);
  const [validationError, setValidationError] = useState<ValidationError>({
    studentId: false,
    standard: false
  });

  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validate = (): boolean => {
    let valid = true;
    let errors: ValidationError = { studentId: false, standard: false };

    const alphanumeric8 = /^[A-Za-z0-9]{8}$/;
    if (!alphanumeric8.test(formData.studentId)) {
      errors.studentId = true;
      valid = false;
    }

    const standardNum = Number(formData.standard);
    if (
      !/^\d+$/.test(formData.standard) || 
      standardNum < 1 ||
      standardNum > 12
    ) {
      errors.standard = true;
      valid = false;
    }

    setValidationError(errors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (selectedRow === null) {
        setStudents(prevStudents => [
          ...prevStudents,
          { ...formData, id: Date.now() }
        ]);
      } else {
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student.id === selectedRow.id ? { ...formData, id: selectedRow.id } : student
          )
        );
        setSelectedRow(null);
      }
      setFormData({
        studentId: '',
        studentName: '',
        marks: '',
        location: '',
        standard: ''
      });
      setValidationError({ studentId: false, standard: false });
    }
  };

  const handleEdit = (student: Student) => {
    setSelectedRow(student);
    setFormData({
      studentId: student.studentId,
      studentName: student.studentName,
      marks: student.marks,
      location: student.location,
      standard: student.standard
    });
  };

  const handleDelete = (studentId: number) => {
    if (window.confirm('Are you sure to delete this record?')) {
      setStudents(prevStudents =>
        prevStudents.filter(student => student.id !== studentId)
      );
      setFormData({
        studentId: '',
        studentName: '',
        marks: '',
        location: '',
        standard: ''
      });
      setSelectedRow(null);

      setNotification({
        show: true,
        message: 'Student record has been deleted successfully.'
      });
    }
  };

  const closeNotification = () => {
    setNotification({
      show: false,
      message: ''
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <section className="py-12 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto space-y-10">
        
        {/* Back Link & Header */}
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline mb-3"
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
          <div className="text-center space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Student Details CRUD
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Manage student registry, grades, and profile locations seamlessly.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Student ID */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Student ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  maxLength={8}
                  placeholder="8 Alphanumeric"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm text-slate-900 dark:text-white focus:outline-none ${
                    validationError.studentId ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                  }`}
                />
                {validationError.studentId && (
                  <p className="text-xs text-red-500 mt-1">
                    Must be exactly 8 alphanumeric characters.
                  </p>
                )}
              </div>

              {/* Student Name */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Standard */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Standard <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="standard"
                  value={formData.standard}
                  onChange={handleInputChange}
                  min={1}
                  max={12}
                  step={1}
                  placeholder="1 to 12"
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border text-sm text-slate-900 dark:text-white focus:outline-none ${
                    validationError.standard ? 'border-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500'
                  }`}
                />
                {validationError.standard && (
                  <p className="text-xs text-red-500 mt-1">
                    Must be a number from 1 to 12.
                  </p>
                )}
              </div>

              {/* Marks */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Marks
                </label>
                <input
                  type="text"
                  name="marks"
                  value={formData.marks}
                  onChange={handleInputChange}
                  placeholder="e.g. 95%"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

            </div>

            {/* Submit Button */}
            <div className="mt-6 text-center">
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                {selectedRow ? 'Update Record' : 'Submit Record'}
              </button>
            </div>
          </form>
        </div>

        {/* Notification Banner */}
        {notification.show && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-400 text-sm flex items-center justify-between">
            <span>{notification.message}</span>
            <button onClick={closeNotification} className="font-bold cursor-pointer hover:opacity-75">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        {/* Student Records Table */}
        {students.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    <th className="p-4 sm:px-6">Student ID</th>
                    <th className="p-4 sm:px-6">Student Name</th>
                    <th className="p-4 sm:px-6">Standard</th>
                    <th className="p-4 sm:px-6">Marks</th>
                    <th className="p-4 sm:px-6">Location</th>
                    <th className="p-4 sm:px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm text-slate-700 dark:text-slate-300">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="p-4 sm:px-6 font-mono font-bold text-indigo-600 dark:text-indigo-400">{student.studentId}</td>
                      <td className="p-4 sm:px-6 font-medium text-slate-900 dark:text-white">{student.studentName || '—'}</td>
                      <td className="p-4 sm:px-6">{student.standard}</td>
                      <td className="p-4 sm:px-6">{student.marks || '—'}</td>
                      <td className="p-4 sm:px-6">{student.location || '—'}</td>
                      <td className="p-4 sm:px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 font-semibold text-xs transition-colors cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(student.id)}
                            className="px-3 py-1.5 rounded-xl bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 hover:bg-red-100 font-semibold text-xs transition-colors cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </section>
    </div>
  );
};

export default CRUDStudentComponent;