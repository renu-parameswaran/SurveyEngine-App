export default function eventListenerHelper(callback) {
  const app = document.querySelector("#app");
  let eventValue = "";
  app.addEventListener("click", function (event) {
    if (event.target.getAttribute("data-type") === "option") {
      eventValue = event.target.value;
      localStorage.setItem("event", event.target.value);
      callback();
    }
  });
}
