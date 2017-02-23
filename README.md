# webservice-test-tool

> A tool for WebService test

## Install
``` bash
# install dependencies
npm install
```

## Quick Start
``` bash
# modify TARGET_WEBSERVICE_SERVER's value which in ./config/dev.env.js file
e.g:
# TARGET_WEBSERVICE_SERVER: '"http://example.com/"'
TARGET_WEBSERVICE_SERVER: '"http://www.myservice.com/api"'

# serve with hot reload at localhost:5000
npm run dev
```

## Browser Support
Modern browsers and Internet Explorer 9+.

## Internal Dependencies
* [vue](https://github.com/vuejs/vue)
* [vuex](https://github.com/vuejs/vuex)
* [vue-resource](https://github.com/pagekit/vue-resource)
* [element-ui](https://github.com/ElemeFE/element) - A Vue.js 2.0 UI Toolkit for Web.
* [jsoneditor](https://github.com/josdejong/jsoneditor) - A web-based tool to view, edit, format, and validate JSON.
* [lodash](https://github.com/lodash/lodash/) - A modern JavaScript utility library delivering modularity, performance, & extras.
* [moment](https://github.com/moment/moment/) - Parse, validate, manipulate, and display dates in javascript.

## ToDo
- [ ] Store Service History in local/server by user
- [ ] Display Service History Item detail information on the left pane

## License
MIT
