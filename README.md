# node-js-geturl

Small service that allows to get href attribute from a specified element on remote page.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ThirteenAG/node-js-geturl)

# Usage
Use the following link to request a result:

    https://node-js-geturl.herokuapp.com/?url=(<URL>)&selector=(<SELECTOR>)
  Replace `<URL>` and `<SELECTOR>` with desired strings.
  
# Examples
Getting href of '[Releases](https://node-js-geturl.herokuapp.com/?url=%28https://github.com/ThirteenAG/node-js-geturl%29&selector=%28a%5Bhref*=releases%5D%29)' link on this page:

    https://node-js-geturl.herokuapp.com/?url=(https://github.com/ThirteenAG/node-js-geturl)&selector=(a[href*=releases])

Getting href of Github's [privacy policy](https://node-js-geturl.herokuapp.com/?url=(https://github.com/)&selector=(p.form-control-note>a[href*=terms])) link on main page:

    https://node-js-geturl.herokuapp.com/?url=(https://github.com/)&selector=(p.form-control-note > a[href*=terms])


Same thing, but [with redirect:](https://node-js-geturl.herokuapp.com/?url=(https://github.com/)&selector=(p.form-control-note>a[href*=terms])&redirect)

    https://node-js-geturl.herokuapp.com/?url=(https://github.com/)&selector=(p.form-control-note > a[href*=terms])&redirect
