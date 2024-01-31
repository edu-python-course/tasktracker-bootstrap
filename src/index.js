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

// include custom stylesheets and javascript
import "./scss/auth.scss"
import "./scss/detail.scss"
import "./scss/form.scss"
import "./scss/list.scss"
import "./scss/profile.scss"

import "./js/tasks"
