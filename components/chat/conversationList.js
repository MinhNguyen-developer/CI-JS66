import { CreateConversationForm } from "./createConversationForm.js";
import { ConversationItem } from "./conversationItem.js";

class ConversationList {
  $container = document.createElement("div");
  $btnCreateConversation = document.createElement("button");
  $createConversationForm = new CreateConversationForm();
  $conversationItemsContainer = document.createElement("div");

  onConversationItemClick;
  conversationItems = [];

  constructor() {
    this.$btnCreateConversation.innerHTML = "+ New";
    this.$btnCreateConversation.addEventListener(
      "click",
      this.handleCreateConversationClick
    );
    this.$btnCreateConversation.classList.add("btn", "btn-primary");
    const $btnCreateConversationContainer = document.createElement("div");
    $btnCreateConversationContainer.classList.add("center");
    $btnCreateConversationContainer.style.paddingTop = "10px";
    $btnCreateConversationContainer.appendChild(this.$btnCreateConversation);

    this.$container.classList.add("conversation-list-container");
    this.$container.appendChild($btnCreateConversationContainer);
    this.$container.appendChild(this.$createConversationForm.$container);
    this.$container.appendChild(this.$conversationItemsContainer);
    this.$conversationItemsContainer.classList.add(
      "conversation-items-container"
    );
  }

  setOnConversationItemClick = (listener) => {
    this.onConversationItemClick = listener;
  };

  handleCreateConversationClick = () => {
    this.$createConversationForm.setVisible(true);
  };

  handleConversationAdded = (id, name, users) => {
    const item = new ConversationItem(id, name, users);
    item.setOnClick((id, name, users) => {
      this.onConversationItemClick({
        id: id,
        name: name,
        users: users,
      });
    });
    this.conversationItems.push(item);
    this.$conversationItemsContainer.appendChild(item.$container);
  };

  handleConversationUpdated = (id, name, users) => {
    this.conversationItems.forEach((item) => {
      if (item.id === id) {
        item.setUsers(users);
      }
    });
  };

  setActiveConversation = (conversation) => {
    this.conversationItems.forEach((item) => {
      if (item.id === conversation.id) {
        item.setHighLight(true);
      } else {
        item.setHighLight(false);
      }
    });
  };
}

export { ConversationList };
