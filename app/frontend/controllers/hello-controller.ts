import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    console.log("Hello from Stimulus!")
    this.element.textContent = "Greetings from a Stimulus controller written in TypeScript"
  }
}
