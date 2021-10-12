class Composer {
  activeConversation = null;

  $container = document.createElement("div");
  $form = document.createElement("form");
  $input = document.createElement("input");
  $btnEmo = document.createElement("button");

  constructor() {
    this.$input.type = "text";
    this.$input.placeholder = "Please be nice in the chat ...";
    this.$btnEmo.innerHTML = "🔥";
    this.$btnEmo.type = "button";

    this.$container.appendChild(this.$form);
    this.$container.classList.add("composer-container");

    this.$form.appendChild(this.$input);
    this.$form.appendChild(this.$btnEmo);

    this.$form.addEventListener("submit", this.handleSubmit);
    this.$btnEmo.addEventListener("click", this.handleBtnEmoClick);
  }

  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
  };

  handleBtnEmoClick = () => {
    if (!firebase.auth().currentUser.email || !this.activeConversation) {
      return;
    }
    db.collection("messages").add({
      content: this.$btnEmo.innerHTML,
      sender: firebase.auth().currentUser.email,
      conversationId: this.activeConversation.id,
      sentAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    if (
      !this.$input.value ||
      !firebase.auth().currentUser.email ||
      !this.activeConversation
    ) {
      return;
    }

    db.collection("messages").add({
      content: this.$input.value,
      sender: firebase.auth().currentUser.email,
      conversationId: this.activeConversation.id,
      sentAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };
}

export { Composer };
