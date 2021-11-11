import { controller, target } from "@github/catalyst"

@controller
class HelloWorldElement extends HTMLElement {
  @target name: HTMLElement
  @target output: HTMLElement

  greet(e: Event) {
    e.preventDefault();
    this.output.textContent = `Hello, ${this.name.value}!`
  }
}
