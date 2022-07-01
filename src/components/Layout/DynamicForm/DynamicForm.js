import React, { useState } from "react";


function DynamicForm() {
	 const [form, setForm] = useState([]);

  const prevIsValid = () => {
    if (form.length === 0) {
      return true;
    }

    const someEmpty = form.some(
      (item) => item.Fullname === "" || item.Email === ""
    );

    if (someEmpty) {
      form.map((item, index) => {
        const allPrev = [...form];

        if (form[index].Email === "") {
          allPrev[index].errors.Email = "Email is required";
        }

        if (form[index].Fullname === "") {
          allPrev[index].errors.Fullname = "Fullname is required";
        }
        setForm(allPrev);
      });
    }

    return !someEmpty;
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    const inputState = {
      Email: "",
      Fullname: "",

      errors: {
        Email: null,
        Fullname: null,
      },
    };

    if (prevIsValid()) {
      setForm((prev) => [...prev, inputState]);
    }
  };

  const onChange = (index, event) => {
    event.preventDefault();
    event.persist();

    setForm((prev) => {
      return prev.map((item, i) => {
        if (i !== index) {
          return item;
        }

        return {
          ...item,
          [event.target.name]: event.target.value,

          errors: {
            ...item.errors,
            [event.target.name]:
              event.target.value.length > 0
                ? null
                : [event.target.name] + " Is required",
          },
        };
      });
    });
  };

  const handleRemoveField = (e, index) => {
    e.preventDefault();

    setForm((prev) => prev.filter((item) => item !== prev[index]));
  };
  return (
    <div className="container mt-5 py-5">
   

      <form>
      <button className="btn btn-primary mt-2 mt-5" onClick={handleAddLink}>
          Add Data
          
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</svg>

        </button>
        {form.map((item, index) => (
          <div className="row mt-3" key={ `item-${index}` }>
             <div className="col-4">
            <div className="form-group">
              <input
                type="text"
                className={
                  item.errors.Fullname
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Fullname"
                placeholder="Fullname"
                value={item.Fullname}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Fullname && (
                <div className="invalid-feedback">{item.errors.Fullname}</div>
                ) }
                </div>
            </div>

            <div className="col-4">
            <div className="form-group">
              <input
                type="email"
                className={
                  item.errors.Email
                    ? "form-control  is-invalid"
                    : "form-control"
                }
                name="Email"
                placeholder="Email"
                value={item.Email}
                onChange={(e) => onChange(index, e)}
              />

              {item.errors.Email && (
                <div className="invalid-feedback">{item.errors.Email}</div>
              ) }
              </div>
            </div>

           
            <div class="col-2">
            <button
              className="btn btn-warning"  onClick={ (e) => handleRemoveField(e, index) } >
                
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <polyline points="3 6 5 6 21 6" />
  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  <line x1="10" y1="11" x2="10" y2="17" />
  <line x1="14" y1="11" x2="14" y2="17" />
</svg>

              
            </button>
            </div>
          
          </div>
        ))}

        
      </form>
    </div>
  );
}

export default DynamicForm;
