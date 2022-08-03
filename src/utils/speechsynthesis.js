export const speak = async (text) => {
  if (!speechSynthesis) {
    return;
  }
  const message = new SpeechSynthesisUtterance(text);
  //   message.voice = await chooseVoice("Microsoft Zira - English (United States)");
  if (await chooseVoice("Microsoft Zira - English (United States)")) {
    message.voice = await chooseVoice(
      "Microsoft Zira - English (United States)"
    );
  } else {
    message.voice = await chooseVoice("Samantha");
  }

  

  //   ("Microsoft Zira - English (United States)" || "Google UK English Female" || "Veena" || "Samantha" )
  console.log(message.voice);
  speechSynthesis.speak(message);

  return new Promise(resolve => {
    message.onend = resolve;
  });
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

export const chooseVoice = async (voicepref) => {
  const voices = (await getVoices()).filter(
    (voice) => voice.name === voicepref

    //   ("Microsoft Zira - English (United States)" || "Google UK English Female" || "Veena" || "Samantha" )
  );
  console.log(voices);
  return new Promise((resolve) => {
    resolve(voices[0]);
  });
};
