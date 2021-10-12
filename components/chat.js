import { ConversationList } from "./chat/conversationList.js";
import { TitleBar } from "./chat/titleBar.js";
import { Composer } from "./chat/composer.js";
import { MessageList } from "./chat/messageList.js";
import { UserList } from "./chat/userList.js";

class Chat {
  activeConversation = null;
  messagesSubscriber = null;

  $container = document.createElement("div");
  $conversationList = new ConversationList();
  $titleBar = new TitleBar();
  $composer = new Composer();
  $messageList = new MessageList();
  $userList = new UserList();

  constructor() {
    this.$conversationList.setOnConversationItemClick(
      this.setActiveConversation
    );
    this.$container.classList.add("d-flex", "w-100", "h-100");
    this.$container.appendChild(this.$conversationList.$container);

    const $bodyContainer = document.createElement("div");
    $bodyContainer.classList.add("d-flex", "flex-col", "flex-1");

    $bodyContainer.appendChild(this.$titleBar.$container);

    const $contentContainer = document.createElement("div");
    $contentContainer.classList.add("d-flex", "flex-1");

    const $messageListContainer = document.createElement("div");
    $messageListContainer.classList.add("d-flex", "flex-1", "flex-col");
    $messageListContainer.appendChild(this.$messageList.$container);
    $messageListContainer.appendChild(this.$composer.$container);

    $contentContainer.appendChild($messageListContainer);
    $contentContainer.appendChild(this.$userList.$container);

    $bodyContainer.appendChild($contentContainer);

    this.$container.appendChild($bodyContainer);
    this.subscribeConversations();
  }

  setActiveConversation = (conversation) => {
    this.activeConversation = conversation;
    this.$titleBar.setName(conversation.name);
    this.$conversationList.setActiveConversation(this.activeConversation);
    this.$composer.setActiveConversation(this.activeConversation);
    this.$messageList.clearMessages();
    this.$userList.setActiveConversation(this.activeConversation);
    this.subscribeMessages();
  };

  subscribeConversations = () => {
    db.collection("conversations")
      .where("users", "array-contains", firebase.auth().currentUser.email)
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            this.$conversationList.handleConversationAdded(
              change.doc.id,
              change.doc.data().name,
              change.doc.data().users
            );
          }
          if (change.type === "modified") {
            this.$conversationList.handleConversationUpdated(
              change.doc.id,
              change.doc.data().name,
              change.doc.data().users
            );
            this.$userList.handleConversationUpdated(
              change.doc.id,
              change.doc.data().name,
              change.doc.data().users
            );
          }
        });
      });
  };

  subscribeMessages = () => {
    if (this.messagesSubscriber !== null) {
      this.messagesSubscriber();
    }
    this.messagesSubscriber = db
      .collection("messages")
      .where("conversationId", "==", this.activeConversation.id)
      .orderBy("sentAt")
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added")
            this.$messageList.addMessage(change.doc.data());
        });
      });
  };
}

export { Chat };
