class ConversationItem {
  id;
  name;
  users;

  $container = document.createElement("div");
  $txtName = document.createElement("span");
  $txtNoOfUsers = document.createElement("small");

  constructor(id, name, users) {
    this.id = id;
    this.name = name;
    this.users = users;

    this.$txtName.innerHTML = name;
    this.$txtNoOfUsers.innerHTML = "(" + users.length + ")";

    this.$container.appendChild(this.$txtName);
    this.$container.appendChild(this.$txtNoOfUsers);
    this.$container.classList.add("conversation-item");
  }

  setOnClick = (listener) => {
    this.$container.onclick = () => {
      listener(this.id, this.name, this.users);
    };
  };

  setHighLight = (isHighlighted) => {
    // this.$container.style.background = isHighlighted ? "blue" : "white";
    if (isHighlighted) {
      this.$container.classList.add("active");
    } else {
      this.$container.classList.remove("active");
    }
  };

  setUsers = (users) => {
    this.users = users;
    this.$txtNoOfUsers.innerHTML = "(" + users.length + ")";
  };
}

export { ConversationItem };
