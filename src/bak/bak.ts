function callbackResponse(message: string, onWord: (word: string) => void, onComplete: () => void, onError: (error: Error) => void) {
  // simulate preparation time
  setTimeout(() => {
    // Initial error, 30% chance
    if (Math.random() < 0.3) {
      onError(new Error("Failed to generate response"));
      return;
    }

    const response = "This is a simulated response to your message: " + message;
    const words = response.split(' ');

    let index = 0;
    const wordInterval = setInterval(() => {
      if (index < words.length) {
        onWord(words[index] + ' ');
        index++;
      } else {
        clearInterval(wordInterval);
        onComplete();
      }
    }, 100);
  }, 2000);  // 2 second preparation delay
}

export { callbackResponse };
