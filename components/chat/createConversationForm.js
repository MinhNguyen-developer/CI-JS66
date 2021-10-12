import { InputGroup } from "../shared/inputGroup.js";
import { Modal } from "../shared/modal.js";

class CreateConversationForm {
  $container = document.createElement("div");

  $modal = new Modal();

  $form = document.createElement("form");
  $conversationNameInput = new InputGroup("Conversation Name", "text");

  constructor() {
    this.$container.appendChild(this.$modal.$container);
    this.$container.style.visibility = "hidden";

    this.$modal.setHeader("Create Conversation");
    this.$modal.setBody(this.$form);
    this.$modal.setOnConfirmClick(this.handleCreateConversation);
    this.$modal.setOnCancelClick(() => {
      this.setVisible(false);
    });
    this.$form.appendChild(this.$conversationNameInput.$container);
  }

  handleCreateConversation = () => {
    const name = this.$conversationNameInput.getValue();
    db.collection("conversations").add({
      name: name,
      users: [firebase.auth().currentUser.email],
    });
  };

  setVisible = (visible) => {
    if (visible) {
      this.$container.style.visibility = "visible";
    } else {
      this.$container.style.visibility = "hidden";
    }
  };
}

export { CreateConversationForm };
