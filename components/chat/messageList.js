import { MessageItem } from "./messageItem.js";

class MessageList {
  $container = document.createElement("div");

  constructor() {
    this.$container.classList.add("flex-1", "message-list-container");
  }

  addMessage = (message) => {
    const item = new MessageItem(message.content, message.sender);
    this.$container.appendChild(item.$container);
  };
  clearMessages = () => {
    this.$container.innerHTML = "";
  };
}

export { MessageList };
