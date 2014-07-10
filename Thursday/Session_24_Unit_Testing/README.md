Unit Testing
============

### What are unit tests? ###

A unit is a small section of code.  Unit testing means you test that bit of code to make sure it functions properly.  This increases confidence in your code.

Unit tests are important when many people work on the same codebase.  If one engineer changes code in one part of the project, you want to ensure that the rest of the project still works.

Unit tests are especially important in dynamically typed languages such as JavaScript, since there is no compiler to catch common problems.

### Lab 1 ###

Calculator example tested with Mocha

1. In Visual Studio, do **File --> Open Website** and select the `start` folder in the GitHub repo directory for this session.  This code comes from the Pluralsight course mentioned in the acknowledgments.
2. Launch the website.  This is the Mocha test runner and you'll see the output for a single unit test.  It tests the `Add` function on the `Calculator` object.
3. Close that browser window
4. In Visual Studio, open `index.html`, `js/calculator.js`, and `test/calculator-tests.js`.  
5. In `index.html`, you'll see the unit test framework Mocha referenced.  You'll also see a reference to Expect.  That's an assertion library.  It then references the JavaScript being tested, `calculator.js`, and then the unit tests themselves, `calculator-tests.js`.
5. In `calculator.js`, you'll see a [JavaScript IIFE](http://tinyurl.com/nsu3okz) which defines a `Calculator` constructor and the `add` function.
6. In `calculator-tests.js` you'll see 3 sections.  The `describe` at the top defines the test suite.  The `beforeEach` sets up any necessary state.  Perhaps your unit test relies on things being set up a certain way.  Do that in `beforeEach`.  The remaining `describe` function describes the specification.  It corresponds to a particular feature.  The call to `it` defines what the test should do.  Be as explicit as possible.  Lastly, `expect` asserts what the result of the test should be.
7. Let's add a new feature.  In `calculator-tests.js`, copy the code for the `add` function and paste it below the `add` function.  Rename it to `subtract`, but don't create the `subtract` function yet.  Run the tests, and it should fail.  This is called TDD: Test-Driven Development.  In TDD, you write your unit test first, run it to verify it fails, and only then implement the code you're testing.  TDD is currently very popular.
8. In `calculator.js`, add the `subtract` function by copying and pasting the `add` function.  Don't change the function body though.
9. Run the tests again.  This time you'll get a different error.

### Principles of unit tests ###

1. Predictable.  If you have a certain input, you should always get the same output.  Your input should always be static.  For example, don't pass a random number or the current time as an input.
2. Pass or fail.  It should be obvious if your test passed or failed.
3. Self documenting.  Your code should describe what the test is meant to do.  Another engineer looking at your test should immediately be able to understand it.  It helps if you use testing and assertion frameworks which read like English.
4. Single responsibility.  Unit tests should only test one single thing at a time.  If you want to test more things, then write more unit tests.
5. Useful error messages
6. Not [integration tests](http://en.wikipedia.org/wiki/Integration_testing).  Unit tests don't test multiple components.  Unit tests come first, then integration tests, then validation tests.

### Common Excuses ###

1. Too busy.  "I have too many other things to do."  "There's plenty of time after development to catch bugs."  When you fix a bug and it breaks something else, it's called a *regression*.  Unit tests can prevent regressions.
2. Too hard.  "It's too difficult to write unit tests."  "It'll take too long because I'm not experienced."
3. Too confident.  "I don't need unit tests.  My code works."  "Why waste time writing unit tests because my code works?"  
4. Too lazy.  "There are other things I'd rather be doing."  "I just don't want to write unit tests."
5. Too cumbersome.  "It takes too long to run the unit tests."  "I keep forgetting to run the unit tests."

### Lab 2 ###

We first ran the unit tests with the Mocha test runner.  You can run your tests directly in Visual Studio using a plugin called [Chutzpah](http://chutzpah.codeplex.com/).

1. To install it, go to **Tools --> Extensions and Updates** in Visual Studio, and then select the **Online** section.  Search for *Chutzpah*.  Install both of the extensions you find.  You'll have to restart Visual Studio after each extension is installed.
2. Add these lines to the top of `calculator-tests.js`:

```javascript
/// <reference path="mocha.js" />
/// <reference path="../js/vender/expect.js" />
```
3. Open the Visual Studio Test Explorer by clicking **Test -> Windows -> Test Explorer**
4. Your tests should now automatically run.  Right-click on your test file to see more options.  

### Acknowledgments: ###

*Front-end First: Testing and Prototyping JavaScript Apps* by Elijah Manor on Pluralsight.com

