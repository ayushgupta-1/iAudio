export const playAudio = (audioFile) => {
  return new Promise((resolve, reject) => {
    try {
      const audio = new Audio(audioFile);

      audio.addEventListener("ended", () => {
        // Resolve the promise when audio playback is complete
        resolve();
      });

      audio.addEventListener("error", (error) => {
        // Reject the promise if an error occurs during playback
        reject(error);
      });

      audio.play();
    } catch (error) {
      // Reject the promise if an error occurs during the creation of audio elements
      reject(error);
    }
  });
};
