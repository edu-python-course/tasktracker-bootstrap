// noinspection ES6UnusedImports

/**
 * Webpack default entry point
 */

// include bootstrap sources
import "bootstrap-icons/font/bootstrap-icons.scss"
import "bootstrap/scss/bootstrap.scss"
import * as bootstrap from "bootstrap"

// include htmx library
import * as htmx from "htmx.org"

// include custom stylesheets, javascript, icons etc.
import "./scss/auth.scss"
import "./scss/detail.scss"
import "./scss/list.scss"
import "./scss/messages.scss"
import "./scss/profile.scss"

import * as messages from "./js/messages"
import "./js/tasks"

import "./img/favicon.png"
import "./img/favicon.svg"

// make global visible
window.bootstrap = bootstrap
window.messages = messages
