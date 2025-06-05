import * as Yup from "yup";
import { MdError } from "react-icons/md";
import { Formik} from "formik";

const compareDates = (d1, d2) => {
  let date1 = new Date(d1.replace(/-/g, "/"));
  date1.setHours(0, 0, 0, 0);
  //let date1 = dt.getTime();
  let date2;
  if (d2 === undefined || d2 === null || d2 === "") {
    date2 = new Date();
    date2.setHours(0, 0, 0, 0);
    //date2 = now.getTime();
  } else {
    date2 = new Date(d2);
    date2.setHours(0, 0, 0, 0);
  }

  if (date1 < date2) {
    return -1;
  } else if (date1 > date2) {
    return 1;
  } else {
    return 0;
  }
};

export function validateBookingForm(values) {
  let errors = {};
  if (values.customerName === "") {
    errors.customerName =
      "Customer name is required. Please provide a valid name";
  } else if (values.customerName.length < 8) {
    errors.customerName = "Please enter at least 8 characters!";
  } else if (values.customerName.length > 50) {
    errors.customerName = "Please enter maximun 50 characters!";
  }

  if (values.date === "") {
    errors.date =
      "Date is required. Please select a valid date starting from today";
  } else if (compareDates(values.date, null) === -1) {
    errors.date = "Please select any date starting from today";
  }

  if (values.time === "") {
    errors.time = "Time is required. Please select a valid time";
  }

  if (values.occasion === "") {
    errors.occasion = "Occasion is required. Please select a valid occasion";
  }

  if (values.guests === "") {
    errors.guests = "Number of guests is required. Please enter a valid number";
  } else if (parseInt(values.guests) < 1) {
    errors.guests = "Please select a number greater than 0";
  } else if (parseInt(values.guests) > 20) {
    errors.guests = "Please enter a maximum of 20 guests";
  }

  if (values.area === "") {
    errors.area = "Seating area is required. Please select an option";
  }

  return errors;
}

function BookingForm({
  bookingData,
  availableTimes,
  handleDateChange,
  submitForm,
}) {
  const iconStyles = {
    color: "red",
    backgroundColor: "white",
    fontSize: "1.5em",
    borderRadius: "50%",
    marginRight: "5px",
  };

  const occasions = ["Birthday", "Anniversary", "Graduation", "Other"];

  const FormSchema = Yup.object().shape({
    customerName: Yup.string()
      .min(8, "Please enter at least 8 characters!")
      .max(50, "Please enter maximun 50 characters!")
      .required("Customer name is required. Please provide a valid name"),
    date: Yup.date()
      .min(new Date(), "Please select any date starting from today")
      .required(
        "Date is required. Please select a valid date starting from today"
      ),
    time: Yup.string().required("Time is required. Please select a valid time"),
    occasion: Yup.string().required(
      "Occasion is required. Please select a valid occasion"
    ),
    guests: Yup.number()
      .min(1, "Please select a number greater than 0")
      .max(20, "Please enter a maximum of 20 guests")
      .required("Number of guests is required. Please enter a valid number"),
    area: Yup.string().required(
      "Seating area is required. Please select an option"
    ),
  });

  /*const formik = useFormik({
        initialValues: bookingData,
        validationSchema: FormSchema,
        onSubmit: values => {
            submitForm(values);
        }
    })*/

  const onDateChange = (e, fn) => {
    handleDateChange(e);
    fn(e);
  };

  const handleClick = (
    e,
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched
  ) => {
    touched.area = true;
    if (values.area == "") {
      errors.area = "Seating area is required. Please select an option";
      setFieldValue(values.area, "");
    }
  };

  return (
    <Formik
      initialValues={bookingData}
      //validationSchema={FormSchema}
      onSubmit={(values) => {
        submitForm(values);
      }}
      validate={validateBookingForm}
      validateOnMount={true}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        touched,
        values,
        formProps,
        isValid,
        dirty,
        validate,
        validateForm,
      }) => (
        <form
          name="booking-form"
          aria-label="booking-form"
          onSubmit={handleSubmit}
        >
          <h2>Select your options</h2>
          <label htmlFor="res-name">Customer Name</label>
          <input
            type="text"
            name="customerName"
            id="res-name"
            value={values.customerName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.customerName && errors.customerName ? (
            <div className="error" data-testid="custNameError">
              <span>
                <MdError style={iconStyles} />
              </span>
              <span className="msg">{errors.customerName}</span>
            </div>
          ) : null}
          <label htmlFor="res-date">Choose date</label>
          <input
            type="date"
            name="date"
            id="res-date"
            value={values.date}
            onBlur={handleBlur}
            onChange={(e) => onDateChange(e, handleChange)}
          />
          {touched.date && errors.date ? (
            <div data-testid="dateError" className="error">
              <span>
                <MdError style={iconStyles} />
              </span>
              <span className="msg">{errors.date}</span>
            </div>
          ) : null}
          <label htmlFor="res-time">Choose time</label>
          <select
            id="res-time"
            name="time"
            value={values.time}
            required
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a time
            </option>
            {availableTimes.map((hr, ind) => (
              <option key={ind} value={hr}>
                {hr}
              </option>
            ))}
          </select>
          {touched.time && errors.time ? (
            <div className="error" data-testid="timeError">
              <span>
                <MdError style={iconStyles} />
              </span>
              <span className="msg">{errors.time}</span>
            </div>
          ) : null}
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            name="guests"
            placeholder="1"
            min="1"
            max="20"
            id="guests"
            value={values.guests}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {touched.guests && errors.guests ? (
            <div className="error" data-testid="guestsError">
              <span>
                <MdError style={iconStyles} />
              </span>
              <span className="msg">{errors.guests}</span>
            </div>
          ) : null}
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            name="occasion"
            value={values.occasion}
            required
            placeholder="Select an occasion"
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select an occasion
            </option>
            <option key="1" value="Birthday">
              Birthday
            </option>
            <option key="2" value="Anniversary">
              Anniversary
            </option>
            <option key="3" value="Graduation">
              Graduation
            </option>
            <option key="4" value="Other">
              Other
            </option>
          </select>
          {touched.occasion && errors.occasion ? (
            <div className="error" data-testid="occasionError">
              <span>
                <MdError style={iconStyles} />
              </span>
              <span className="msg">{errors.occasion}</span>
            </div>
          ) : null}
          <label htmlFor="area">Choose a seating area</label>
          <div
            id="area"
            data-testid="area"
            className="area-options"
            aria-label="Choose a seating area"
            onClick={(e) =>
              handleClick(
                e,
                values,
                touched,
                errors,
                setFieldValue,
                setFieldTouched
              )
            }
          >
            <div className="area">
              <input
                type="radio"
                id="indoor"
                value="Indoor"
                name="area"
                aria-label="Indoor"
                checked={values.area === "Indoor"}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={(e) => e.stopPropagation()}
              />

              <label htmlFor="indoor">Indoor</label>
            </div>
            <div className="area">
              <input
                type="radio"
                id="outdoor"
                value="Outdoor"
                name="area"
                aria-label="Outdoor"
                checked={values.area === "Outdoor"}
                onChange={handleChange}
                onBlur={handleBlur}
                onClick={(e) => e.stopPropagation()}
              />

              <label htmlFor="outdoor">Outdoor</label>
            </div>
          </div>
          {touched.area && errors.area ? (
            <div className="error" data-testid="areaError">
              <span>
                <MdError style={iconStyles} />
              </span>
              <span className="msg">{errors.area}</span>
            </div>
          ) : null}
          <input
            disabled={!isValid}
            data-testid="submitButton"
            type="submit"
            aria-label="submit"
            value="Make Your reservation"
          />
        </form>
      )}
    </Formik>
  );
}

export default BookingForm;
