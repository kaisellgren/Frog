What's Frog?
==
Frog is a NodeJS module that enables Google Dart support. You may now write server-side Dart enabled NodeJS applications.

## How to install
It's not yet released, but when it is:

```
npm install Frog
```

For now, clone the repo.

## Examples

#####app.js
```javascript
// Include the Frog compiler.
require('./../lib/Frog.js');

// Now just run Dart like a boss.
console.log('I am about to run some Dart...');

require('./test.dart');

console.log('I just ran Dart!');
```
#####test.dart
```dart
class Point {
  Point(this.x, this.y);

  distanceTo(Point other) {
    var dx = x - other.x;
    var dy = y - other.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  var x, y;
}

main() {
  Point p = new Point(2, 3);
  Point q = new Point(3, 4);

  print('distance from p to q = ${p.distanceTo(q)}');
}
```

#####Run it
```
$ node app.js
I am about to run some Dart...
distance from p to q = 1.4142135623730951
I just ran Dart!
```

## Status

This project is not yet production ready! It's also quite slow. I'm planning to take another approach to this.