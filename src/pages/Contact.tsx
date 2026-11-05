import React, { useState } from 'react';

 const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Info Column */}
        <div className="space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3 block">Get in Touch  only demo layout</span>
            <h1 className="text-4xl font-extrabold tracking-tight">Let's discuss your next project</h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              Have questions about our components, pricing, or custom implementations? Fill out the form and our team will get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-900 text-indigo-600 flex items-center justify-center text-lg shrink-0">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Our Office</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">100 Innovation Drive, Silicon Valley, CA</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-900 text-indigo-600 flex items-center justify-center text-lg shrink-0">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Email Us</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">support@sleekui.dev</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-900 text-indigo-600 flex items-center justify-center text-lg shrink-0">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Call Us</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">+1 (555) 234-5678</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                <i className="fa-solid fa-check"></i>
              </div>
              <h3 className="text-2xl font-bold">Message Sent!</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Thank you for reaching out. We will get back to you shortly.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 text-sm resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default Contact;