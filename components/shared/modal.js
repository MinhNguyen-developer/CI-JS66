class Modal {
  $container = document.createElement("div");
  $modalContainer = document.createElement("div");

  $header = document.createElement("div");
  $body = document.createElement("div");
  $footer = document.createElement("div");

  $btnConfirm = document.createElement("button");
  $btnCancel = document.createElement("button");

  constructor() {
    this.$container.appendChild(this.$modalContainer);
    this.$container.classList.add("modal-backdrop");

    this.$header.classList.add("header");
    this.$body.classList.add("body");
    this.$footer.classList.add("footer");

    this.$modalContainer.appendChild(this.$header);
    this.$modalContainer.appendChild(this.$body);
    this.$modalContainer.appendChild(this.$footer);
    this.$modalContainer.classList.add("modal-container");

    this.$btnConfirm.innerHTML = "OK";
    this.$btnConfirm.classList.add("btn", "btn-primary");

    this.$btnCancel.innerHTML = "Cancel";
    this.$btnCancel.classList.add("btn", "btn-secondary");
    this.$btnCancel.style.marginRight = "10px";

    this.$footer.appendChild(this.$btnCancel);
    this.$footer.appendChild(this.$btnConfirm);
  }

  setBody = (component) => {
    this.$body.innerHTML = "";
    this.$body.appendChild(component);
  };

  setHeader = (title) => {
    this.$header.innerHTML = title;
  };

  setOnCancelClick = (listener) => {
    this.$btnCancel.onclick = listener;
  };

  setOnConfirmClick = (listener) => {
    this.$btnConfirm.onclick = listener;
  };
}

export { Modal };
