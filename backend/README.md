### Hints

There is a file inside `.vscode/settings.json` which is hidding some project files inside your vscode editor, if you need to see things inside the project, so go there and change the boolean values for the respective files you want to see in your editor.

Don't worry you can change it the way you want, I just decided to do it to make things easier for you to see the entire project.

Usefull scripts:

```js
  yarn run format - will use prettier to format the entire project
  yarn run lint - will run eslint inside the entire project
  yarn run start - will start the backend service locally
  yarn run test - will start the jest tests without watch
  yarn run test:w - will start the tests with watcher
  yarn run test:c - will run the tests with coverage
```
