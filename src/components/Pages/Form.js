import React from "react";
// import { NavLink } from "react-router-dom";
import "./Form.css";

import { useForm } from "react-hook-form";
const Form = () => {

      const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };




  return (
    <>
    <div className="container pt-5 pb-5">
      <div className="pt-5 row justify-content-sm-center">
        <div className="pb-3 shadow col-sm-6 round">
          <h1 className="pt-3 text-center text-secondary"> Form</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="col-form-label">Name:</label>
              <input
                type="text" placeholder="Rick Gates"
                className={`form-control ${errors.name && "invalid"}`}
                {...register("name", { required: "Name is Required" })}
                onKeyUp={() => {
                  trigger("name");
                }}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>
           
            <div className="form-group">
              <label className="col-form-label">Email:</label>
              <input
                type="text" placeholder="yourname@test.com"
                className={`form-control ${errors.email && "invalid"}`}
                {...register("email", { required: "Email is Required" ,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                }})}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Phone:</label>
              <input
                type="text" placeholder="123-213-2134"
                className={`form-control ${errors.phone && "invalid"}`}
                {...register("phone", { required: "Phone is Required",
                pattern: {
                  value: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                  message: "Invalid phone no",
                },
               })}
               onKeyUp={() => {
                trigger("phone");
              }}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Message:</label>
              <textarea placeholder="Message" max="300"
                className={`form-control ${errors.message && "invalid"}`}
                {...register("message", { required: "Message is Required",
                minLength: {
                  value: 10,
                  message: "Minimum Required length is 3",
                },
                maxLength: {
                  value: 50,
                  message: "Maximum allowed length is 300 ",
                }
               })}
               onKeyUp={() => {
                trigger("message");
              }}
              ></textarea>
              {errors.message && (
                <small className="text-danger">{errors.message.message}</small>
              )}
            </div>
            <input
              type="submit"
              className="my-3 btn btn-primary"
              value="Send"
            />
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Form;
