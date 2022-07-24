const speak = async (text) => {
  if (!speechSynthesis) {
    return;
  }
  const message = new SpeechSynthesisUtterance(text);
  message.voice = await chooseVoice();
  speechSynthesis.speak(message);
};

const getVoices = () => {
  return new Promise((resolve) => {
    let voices = speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
      return;
    }
    speechSynthesis.onvoiceschanged = () => {
      voices = speechSynthesis.getVoices();
      resolve(voices);
    };
  });
};

const chooseVoice = async () => {
  const voices = (await getVoices()).filter(
    (voice) => voice.name === "Microsoft Zira - English (United States)"
  );

  return new Promise((resolve) => {
    console.log(voices[0]);
    resolve(voices[0]);
  });
};

export default speak();
