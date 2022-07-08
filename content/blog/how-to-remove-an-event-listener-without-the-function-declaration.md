---
title: How to remove an Event Listener without the function declaration
date: 2022-07-07T16:00:47.845Z
cover: /assets/screenshot-2022-07-07-at-17.00.25.png
tags: Javascript, Typescript, Events
snippet: A quick tutorial to show how we can use AbortControllers to remove
  event listeners without needing to know the event listeners function
  declaration.
---
I learned a new feature in Javascript the other day whilst I was working on a new game prototype. My requirement was to have one Event in this case a `TouchEnd` event call a function to remove a different Event Listener for a `TouchMove` event. 

The regular way of doing this would be by using `removeEventListener`

<p class="codepen" data-height="300" data-theme-id="light" data-default-tab="js,result" data-slug-hash="GRxZKGm" data-user="the_fisk" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/the_fisk/pen/GRxZKGm">
  Untitled</a> by Craig Fisk (<a href="https://codepen.io/the_fisk">@the_fisk</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

```javascript
const canvas = document.getElementById('canvas');

function handleTouchEnd() {
  canvas.removeEventListener('touchmove', handleTouchMove);
}

function handleTouchMove() {
  // Do Stuff on Touch Move
}

canvas.addEventListener('touchmove', handleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);
```

This example will remove the `touchmove` event when the `touchend` event is fired.

However this does not work if you have to bind the execution context to the listener function as `bind` creates a new function reference.

There are two ways this can be solved, one of which was new to me:

**Old way**

```javascript
const canvas = document.getElementById('canvas');

function handleTouchEnd() {
  canvas.removeEventListener('touchmove', boundHandleTouchMove);
}

function handleTouchMove() {
  // Do Stuff on Touch Move
}

const boundHandleTouchMove = handleTouchMove.bind(this);

canvas.addEventListener('touchmove', boundHandleTouchMove);
canvas.addEventListener('touchend', handleTouchEnd);
```

This way creates a new function declaration with the bound context and assigns it to a const called `boundHandleTouchMove`, then this can be used as the reference for add and `removeEventListener`.

**New way**

```javascript
const canvas = document.getElementById('canvas');
const controller = new AbortController();

function handleTouchEnd() {
  controller.abort();
}

function handleTouchMove() {
  // Do Stuff on Touch Move
}

canvas.addEventListener('touchmove', handleTouchMove, 
  { signal: controller.signal });
canvas.addEventListener('touchend', handleTouchEnd);
```

This way we create an AbortController and store a reference to it in the const controller. We then pass a reference to the AbortControllers signal to the event listener via the signal property on the event listeners options parameter. We can then at any point, in this case when handleTouchEnd is called call the controller's abort function which removes the event listener.

This is an interesting way of handling removing event listeners as the reference to the controller can both be stored for a long time as well as called far away from the context of the original addEventListener call as we don't need to know the name of the original event listeners reference to remove it.