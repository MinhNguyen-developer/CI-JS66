class InputGroup {
  $container = document.createElement("div");
  $label = document.createElement("label");
  $input = document.createElement("input");
  $errMessage = document.createElement("div");

  constructor(label, inputType) {
    this.$label.innerHTML = label;
    this.$input.type = inputType;

    this.$container.classList.add("input_group-container");
    this.$errMessage.classList.add("err-msg");
    this.$container.appendChild(this.$label);
    this.$container.appendChild(this.$input);
    this.$container.appendChild(this.$errMessage);
  }

  getValue = () => {
    return this.$input.value;
  };

  setErrorMessage = (errMsg) => {
    this.$errMessage.innerHTML = errMsg;
    if (errMsg) {
      this.$container.classList.add("has-error");
    } else {
      this.$container.classList.remove("has-error");
    }
  };
}

export { InputGroup };
