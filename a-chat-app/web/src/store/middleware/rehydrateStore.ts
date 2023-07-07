const rehydrateStore = () => {
  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("a-chat-app") !== null) {
      return { token: window.localStorage.getItem("a-chat-app") }; // re-hydrate the store
    }
    console.log("inside rehydration");
    return { token: null };
  }
};

export { rehydrateStore };
