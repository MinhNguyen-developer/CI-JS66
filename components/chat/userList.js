class UserList {
  activeConversation = null;

  $container = document.createElement("div");
  $form = document.createElement("form");
  $input = document.createElement("input");
  $userList = document.createElement("ul");

  constructor() {
    this.$container.appendChild(this.$form);
    this.$container.appendChild(this.$userList);
    this.$container.classList.add("user-list-container");

    this.$form.appendChild(this.$input);
    this.$form.addEventListener("submit", this.handleSubmit);

    this.$input.type = "email";
    this.$input.placeholder = "Enter email ...";
    this.$input.classList.add("add-user-input");
  }

  handleSubmit = (evt) => {
    evt.preventDefault();
    const newUserList = this.activeConversation.users.concat(this.$input.value);

    db.collection("conversations").doc(this.activeConversation.id).update({
      users: newUserList,
    });
  };

  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
    this.$userList.innerHTML = "";
    conversation.users.forEach((user) => {
      const $li = document.createElement("li");
      $li.innerHTML = user;
      this.$userList.appendChild($li);
    });
  };

  handleConversationUpdated = (id, name, users) => {
    if (!this.activeConversation || this.activeConversation.id !== id) {
      return;
    }
    this.$userList.innerHTML = "";
    users.forEach((user) => {
      const $li = document.createElement("li");
      $li.innerHTML = user;
      this.$userList.appendChild($li);
    });
  };
}

export { UserList };
