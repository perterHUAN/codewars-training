import Thing from "./the-builder-of-things.js";

const jane = new Thing("jane");

jane.can.speak(function (phrase) {
  return `${name} say ${phrase}`;
});
console.log(jane.speak("hello"));
