
import { Application } from "@hotwired/stimulus"
import { registerControllers } from 'stimulus-vite-helpers'

// Start the Stimulus application.
const application = Application.start()

// Controller files must be named *-controller.ts.
const controllers = import.meta.globEager('./**/*-controller.ts')
registerControllers(application, controllers)
