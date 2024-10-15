function streamResponse(message: string) {
  return new Promise((resolve, reject) => {
    // simulate preparation time
    setTimeout(() => {
      // Initial error, 30% chance
      if (Math.random() < 0.3) {
        reject(new Error("Failed to generate response"));
        return;
      }

      const response = `You said: "${message}". Here's a streaming response...`;
      const encoder = new TextEncoder();
      let position = 0;

      const stream = new ReadableStream({
        start(controller) {
          function push() {
            if (position < response.length) {
              const chunk = response.slice(position, position + 5);
              controller.enqueue(encoder.encode(chunk));
              position += 5;
              // stream at a rate of 5 characters every 100 ms
              setTimeout(push, 100);
            } else {
              controller.close();
            }
          }
          push();
        }
      });

      resolve(stream);
    }, 2000); // 2 second preparation delay
  });
}

export { streamResponse };
