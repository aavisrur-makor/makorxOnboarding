import validator from "validator";

const validateUtil = (id, value, setError) => {
  if (validator.isEmpty(value)) {
    console.log(
      "🚀 ~ file: validate.js ~ line 5 ~ validateUtil ~ value",
      value
    );
    setError("Field is empty.");
    return;
  } else {
    switch (id) {
      case "email":
        console.log(
          "🚀 ~ file: DispatcherField.js ~ line 42 ~ validate ~ id",
          id
        );
        setError(validator.isEmail(value) ? "" : "Not a valid email address.");
        break;

      default:
        return null;
    }
  }
};

export default validateUtil;
