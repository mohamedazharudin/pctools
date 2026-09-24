import { useState } from 'react';

const quizData = {
  html: [
    { id: 1, question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "Hyper Transfer Main Language"], answer: 0 },
    { id: 2, question: "Which HTML tag is used for the largest heading?", options: ["<heading>", "<h6>", "<h1>", "<head>"], answer: 2 },
    { id: 3, question: "Which element is used to create a line break?", options: ["<break>", "<br>", "<lb>", "<line>"], answer: 1 },
    { id: 4, question: "What is the correct HTML element for adding a background color?", options: ["<body bg='yellow'>", "<body style='background-color:yellow;'>", "<background>yellow</background>", "<body color='yellow'>"], answer: 1 },
    { id: 5, question: "Which HTML attribute is used to define inline styles?", options: ["font", "class", "styles", "style"], answer: 3 },
    { id: 6, question: "Which HTML tag is used to define an italicized text?", options: ["<i>", "<italic>", "<italicize>", "<oblique>"], answer: 0 },
    { id: 7, question: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<url>"], answer: 1 },
    { id: 8, question: "Which character is used to indicate an end tag?", options: ["*", "/", "<", "^"], answer: 1 },
    { id: 9, question: "How can you open a link in a new tab/browser window?", options: ["<a href='url' target='_blank'>", "<a href='url' target='new'>", "<a href='url' open='blank'>", "<a href='url' new>"], answer: 0 },
    { id: 10, question: "Which elements are all <table> elements?", options: ["<table><tr><tt>", "<table><tr><td>", "<table><head><tfoot>", "<thead><body><table>"], answer: 1 },
    { id: 11, question: "Inline elements are normally displayed without starting a new line.", options: ["True", "False"], answer: 0 },
    { id: 12, question: "How can you make a numbered list?", options: ["<dl>", "<list>", "<ol>", "<ul>"], answer: 2 },
    { id: 13, question: "How can you make a bulleted list?", options: ["<ul>", "<ol>", "<list>", "<dl>"], answer: 0 },
    { id: 14, question: "What is the correct HTML for making a checkbox?", options: ["<input type='checkbox'>", "<checkbox>", "<check>", "<input type='check'>"], answer: 0 },
    { id: 15, question: "What is the correct HTML for making a text input field?", options: ["<input type='text'>", "<textfield>", "<textinput>", "<input type='textfield'>"], answer: 0 },
    { id: 16, question: "What is the correct HTML for making a drop-down list?", options: ["<input type='dropdown'>", "<select>", "<list>", "<dropdown>"], answer: 1 },
    { id: 17, question: "What is the correct HTML for inserting an image?", options: ["<img alt='MyImage'>image.gif</img>", "<image src='image.gif' alt='MyImage'>", "<img src='image.gif' alt='MyImage'>", "<img href='image.gif'>"], answer: 2 },
    { id: 18, question: "What does the <canvas> element in HTML5 do?", options: ["Displays database data", "Used to draw graphics via scripting", "Manipulates MySQL data", "Stores data locally"], answer: 1 },
    { id: 19, question: "Which HTML5 element is used to specify a footer for a document or section?", options: ["<bottom>", "<section>", "<footer>", "<foot>"], answer: 2 },
    { id: 20, question: "In HTML, audio elements can be added using which tag?", options: ["<sound>", "<audio>", "<mp3>", "<music>"], answer: 1 },
    { id: 21, question: "Which HTML tag is used to define important text?", options: ["<important>", "<strong>", "<i>", "<b>"], answer: 1 },
    { id: 22, question: "Which tag is used to define emphasized text?", options: ["<i>", "<italic>", "<em>", "<strong>"], answer: 2 },
    { id: 23, question: "Which HTML attribute specifies an alternate text for an image?", options: ["src", "alt", "title", "longdesc"], answer: 1 },
    { id: 24, question: "Which doctype declaration is correct for HTML5?", options: ["<!DOCTYPE html>", "<!DOCTYPE HTML5>", "<!DOCTYPE HTML PUBLIC>", "<html>doctype</html>"], answer: 0 },
    { id: 25, question: "Which HTML element is used to specify a header for a document or section?", options: ["<head>", "<header>", "<top>", "<section>"], answer: 1 },
    { id: 26, question: "What is the correct HTML tag for inserting a line break?", options: ["<br>", "<lb>", "<break>", "<newline>"], answer: 0 },
    { id: 27, question: "Which HTML element defines navigation links?", options: ["<navigation>", "<nav>", "<links>", "<navigate>"], answer: 1 },
    { id: 28, question: "Which HTML element is used to play video files?", options: ["<media>", "<video>", "<movie>", "<play>"], answer: 1 },
    { id: 29, question: "Which input type defines a slider control in HTML5?", options: ["slider", "range", "controls", "scroll"], answer: 1 },
    { id: 30, question: "Which HTML attribute is used to restrict input length in a text field?", options: ["limit", "maxlength", "length", "max"], answer: 1 },
    { id: 31, question: "Which HTML tag is used to group inline-elements?", options: ["<div>", "<span>", "<group>", "<section>"], answer: 1 },
    { id: 32, question: "Which HTML tag is used to group block-elements?", options: ["<span>", "<div>", "<block>", "<section>"], answer: 1 },
    { id: 33, question: "What attribute is used to make an input field required?", options: ["validate", "required", "mandatory", "needed"], answer: 1 },
    { id: 34, question: "Which HTML element defines self-contained content, like a blog post?", options: ["<section>", "<article>", "<content>", "<aside>"], answer: 1 },
    { id: 35, question: "Which element is used to define content aside from the page content?", options: ["<sidebar>", "<aside>", "<navigation>", "<section>"], answer: 1 },
    { id: 36, question: "Which HTML attribute specifies that an input field should automatically get focus when page loads?", options: ["autofocus", "focus", "active", "auto"], answer: 0 },
    { id: 37, question: "Which element is used to display a scalar measurement within a known range?", options: ["<range>", "<meter>", "<gauge>", "<progress>"], answer: 1 },
    { id: 38, question: "Which element represents the completion progress of a task?", options: ["<progress>", "<meter>", "<bar>", "<task>"], answer: 0 },
    { id: 39, question: "What is the default method for submitting form data in HTML?", options: ["POST", "GET", "PUT", "SEND"], answer: 1 },
    { id: 40, question: "Which tag is used to render a preformatted text block?", options: ["<code>", "<pre>", "<text>", "<format>"], answer: 1 },
    { id: 41, question: "What does the <sub> tag do?", options: ["Renders superscript text", "Renders subscript text", "Renders small text", "Renders strike-through text"], answer: 1 },
    { id: 42, question: "What does the <sup> tag do?", options: ["Renders subscript text", "Renders superscript text", "Renders bold text", "Renders underlined text"], answer: 1 },
    { id: 43, question: "Which attribute sets placeholder text inside an input field?", options: ["value", "hint", "placeholder", "text"], answer: 2 },
    { id: 44, question: "Which HTML tag is used to embed an external website inside your page?", options: ["<frame>", "<iframe>", "<embed>", "<object>"], answer: 1 },
    { id: 45, question: "Which HTML attribute specifies the character encoding for the HTML document?", options: ["meta", "charset", "encoding", "code"], answer: 1 },
    { id: 46, question: "Where is the correct place to insert a <title> tag?", options: ["Inside <body>", "Inside <head>", "Before <html>", "After <footer>"], answer: 1 },
    { id: 47, question: "Which tag is used to define a list item?", options: ["<item>", "<li>", "<list>", "<ul>"], answer: 1 },
    { id: 48, question: "Which HTML attribute opens a link in a new window or tab?", options: ["target='_self'", "target='_blank'", "target='_parent'", "target='_top'"], answer: 1 },
    { id: 49, question: "Which tag defines additional details that the user can view or hide?", options: ["<details>", "<summary>", "<dialog>", "<info>"], answer: 0 },
    { id: 50, question: "Which tag represents a caption for a <details> element?", options: ["<caption>", "<summary>", "<header>", "<title>"], answer: 1 }
  ],
  css: [
    { id: 1, question: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"], answer: 1 },
    { id: 2, question: "Which HTML tag is used to define an internal style sheet?", options: ["<css>", "<script>", "<style>", "<link>"], answer: 2 },
    { id: 3, question: "Which HTML attribute is used to define inline styles?", options: ["styles", "style", "class", "font"], answer: 1 },
    { id: 4, question: "Which is the correct CSS syntax?", options: ["body {color: black;}", "{body:color=black;}", "body:color=black;", "{body;color:black;}"], answer: 0 },
    { id: 5, question: "How do you insert a comment in a CSS file?", options: ["// this is a comment", "/* this is a comment */", "' this is a comment", ""], answer: 1 },
    { id: 6, question: "Which property is used to change the background color?", options: ["color", "bgcolor", "background-color", "canvas-color"], answer: 2 },
    { id: 7, question: "How do you add a background color for all <h1> elements?", options: ["all.h1 {background-color:#FFFFFF;}", "h1.all {background-color:#FFFFFF;}", "h1 {background-color:#FFFFFF;}", "h1 (background-color:#FFFFFF;)"], answer: 2 },
    { id: 8, question: "Which CSS property is used to change the text color of an element?", options: ["fgcolor", "text-color", "color", "font-color"], answer: 2 },
    { id: 9, question: "Which CSS property controls the text size?", options: ["font-style", "text-size", "font-size", "text-style"], answer: 2 },
    { id: 10, question: "What is the correct CSS syntax for making all the <p> elements bold?", options: ["p {font-weight:bold;}", "p {text-size:bold;}", "<p style='text-size:bold;'>", "p {text-style:bold;}"], answer: 0 },
    { id: 11, question: "How do you display hyperlinks without an underline?", options: ["a {underline:none;}", "a {text-decoration:none;}", "a {text-decoration:no-underline;}", "a {decoration:no-underline;}"], answer: 1 },
    { id: 12, question: "How do you make each word in a text start with a capital letter?", options: ["text-transform:capitalize", "text-transform:uppercase", "transform:capitalize", "font-transform:capitalize"], answer: 0 },
    { id: 13, question: "Which CSS property is used to change the font of an element?", options: ["font-style", "font-weight", "font-family", "font-var"], answer: 2 },
    { id: 14, question: "How do you make the text bold?", options: ["font-weight:bold;", "style:bold;", "font:bold;", "text-weight:bold;"], answer: 0 },
    { id: 15, question: "Which property is used to display a border with a specific thickness?", options: ["border-width", "border-style", "border-color", "border-size"], answer: 0 },
    { id: 16, question: "How do you select an element with id 'demo'?", options: [".demo", "*demo", "#demo", "demo"], answer: 2 },
    { id: 17, question: "How do you select elements with class name 'test'?", options: ["*test", ".test", "#test", "test"], answer: 1 },
    { id: 18, question: "How do you select all p elements inside a div element?", options: ["div p", "div + p", "div > p", "div.p"], answer: 0 },
    { id: 19, question: "What is the default value of the position property?", options: ["relative", "fixed", "absolute", "static"], answer: 3 },
    { id: 20, question: "Which property is used to control the element stack level?", options: ["z-index", "stack-level", "position-index", "elevation"], answer: 0 },
    { id: 21, question: "Which CSS property controls space inside an element border?", options: ["margin", "padding", "spacing", "border-spacing"], answer: 1 },
    { id: 22, question: "Which CSS property controls space outside an element border?", options: ["padding", "margin", "spacing", "outset"], answer: 1 },
    { id: 23, question: "How do you make a list that lists its items with squares?", options: ["list-type: square;", "list-style-type: square;", "list: square;", "list-style: square-box;"], answer: 1 },
    { id: 24, question: "How do you group selectors?", options: ["Separate each selector with a space", "Separate each selector with a comma", "Separate each selector with a plus sign", "Separate each selector with a dot"], answer: 1 },
    { id: 25, question: "Which CSS property is used to hide an element without removing layout space?", options: ["display: none;", "visibility: hidden;", "opacity: 0;", "both visibility: hidden and opacity: 0"], answer: 3 },
    { id: 26, question: "Which CSS property completely removes an element from the document layout?", options: ["display: none;", "visibility: hidden;", "opacity: 0;", "clear: both;"], answer: 0 },
    { id: 27, question: "What does flex-direction: column do in Flexbox?", options: ["Aligns items horizontally", "Aligns items vertically", "Reverses grid items", "Packs items in center"], answer: 1 },
    { id: 28, question: "Which property aligns items along the main axis in Flexbox?", options: ["align-items", "justify-content", "align-content", "center-items"], answer: 1 },
    { id: 29, question: "Which property aligns items along the cross axis in Flexbox?", options: ["justify-content", "align-items", "cross-align", "flex-cross"], answer: 1 },
    { id: 30, question: "How do you apply styles for screens narrower than 600px?", options: ["@media (max-width: 600px)", "@media (min-width: 600px)", "@screen (max-width: 600px)", "@media screen and (width: 600px)"], answer: 0 },
    { id: 31, question: "Which CSS unit is relative to the font-size of the root element?", options: ["em", "rem", "px", "vh"], answer: 1 },
    { id: 32, question: "Which CSS unit is relative to 1% of the viewport width?", options: ["vw", "vh", "rem", "%"], answer: 0 },
    { id: 33, question: "What is the shorthand syntax for margin: top right bottom left?", options: ["margin: T R B L;", "margin: L R T B;", "margin: T B L R;", "margin: R L T B;"], answer: 0 },
    { id: 34, question: "Which CSS property defines space between grid columns and rows?", options: ["grid-gap", "gap", "grid-space", "both grid-gap and gap"], answer: 3 },
    { id: 35, question: "What does box-sizing: border-box do?", options: ["Includes padding and border in element's total width/height", "Excludes padding from width", "Adds extra margin around border", "Boxes text content only"], answer: 0 },
    { id: 36, question: "Which property specifies transition effects speed curve?", options: ["transition-timing-function", "transition-duration", "transition-delay", "transition-speed"], answer: 0 },
    { id: 37, question: "Which property defines a 2D or 3D transformation to an element?", options: ["transform", "transition", "translate", "animation"], answer: 0 },
    { id: 38, question: "Which CSS property is used to round the corners of an element?", options: ["corner-radius", "border-radius", "box-radius", "edge-radius"], answer: 1 },
    { id: 39, question: "Which property adds shadow to an element box?", options: ["text-shadow", "box-shadow", "element-shadow", "shadow"], answer: 1 },
    { id: 40, question: "Which pseudo-class targets an element when hovered by mouse?", options: [":active", ":focus", ":hover", ":visited"], answer: 2 },
    { id: 41, question: "Which pseudo-class targets an active link or button being clicked?", options: [":hover", ":active", ":focus", ":visited"], answer: 1 },
    { id: 42, question: "Which pseudo-class targets the first child element?", options: [":first-child", ":first-type", ":child(1)", ":initial"], answer: 0 },
    { id: 43, question: "Which property allows text to wrap to the next line if it exceeds container size?", options: ["word-wrap", "overflow-wrap", "text-wrap", "both word-wrap and overflow-wrap"], answer: 3 },
    { id: 44, question: "How do you set an element to fixed position relative to the browser viewport?", options: ["position: absolute;", "position: fixed;", "position: sticky;", "position: relative;"], answer: 1 },
    { id: 45, question: "What is the result of opacity: 0.5?", options: ["50% transparent", "5% transparent", "Fully opaque", "Inverted colors"], answer: 0 },
    { id: 46, question: "Which property sets background image repeat behavior?", options: ["background-style", "background-repeat", "background-mode", "background-tile"], answer: 1 },
    { id: 47, question: "Which value of background-size stretches the image to cover the entire container?", options: ["contain", "cover", "fill", "auto"], answer: 1 },
    { id: 48, question: "How do you make text uppercase?", options: ["text-transform: uppercase;", "font-style: uppercase;", "text-style: capital;", "transform: uppercase;"], answer: 0 },
    { id: 49, question: "Which keyword cancels inherited CSS styles?", options: ["initial", "unset", "revert", "all of the above"], answer: 3 },
    { id: 50, question: "Which property specifies element overflow handling?", options: ["overflow", "scroll", "clip", "wrapper"], answer: 0 }
  ],
  javascript: [
    { id: 1, question: "Which keyword declares a block-scoped variable in JavaScript?", options: ["var", "let", "define", "set"], answer: 1 },
    { id: 2, question: "Which syntax is used to write a comment in JavaScript?", options: ["", "// comment", "/* comment */", "Both // and /* */"], answer: 3 },
    { id: 3, question: "What is the output of typeof null in JavaScript?", options: ["'null'", "'undefined'", "'object'", "'number'"], answer: 2 },
    { id: 4, question: "Which method converts a string to an integer?", options: ["parseInteger()", "parseInt()", "Number.toInt()", "convertToInt()"], answer: 1 },
    { id: 5, question: "How do you declare a constant variable in JavaScript?", options: ["constant x = 10;", "const x = 10;", "var const x = 10;", "let const x = 10;"], answer: 1 },
    { id: 6, question: "Which operator checks both value and type equality?", options: ["==", "=", "===", "=="], answer: 2 },
    { id: 7, question: "What is the correct syntax to create a function in JS?", options: ["function myFunction()", "function:myFunction()", "create myFunction()", "def myFunction()"], answer: 0 },
    { id: 8, question: "How do you call a function named 'myFunction'?", options: ["call myFunction()", "myFunction()", "call function myFunction()", "Execute myFunction()"], answer: 1 },
    { id: 9, question: "How to write an IF statement in JavaScript?", options: ["if i = 5 then", "if (i == 5)", "if i == 5 then", "if i = 5"], answer: 1 },
    { id: 10, question: "Which loop runs at least once before checking condition?", options: ["for loop", "while loop", "do...while loop", "foreach loop"], answer: 2 },
    { id: 11, question: "How do you add an element to the end of an array?", options: ["array.push(item)", "array.pop(item)", "array.append(item)", "array.unshift(item)"], answer: 0 },
    { id: 12, question: "Which method removes the last element from an array?", options: ["shift()", "pop()", "push()", "slice()"], answer: 1 },
    { id: 13, question: "How do you find the length of a string in JS?", options: ["str.length", "str.size()", "length(str)", "str.count"], answer: 0 },
    { id: 14, question: "Which built-in object represents mathematical constants and functions?", options: ["Math", "Numbers", "Calc", "Matrix"], answer: 0 },
    { id: 15, question: "How do you write an arrow function in JavaScript?", options: ["() => {}", "function() => {}", "-> () {}", "def () => {}"], answer: 0 },
    { id: 16, question: "What will '2' + 2 evaluate to in JavaScript?", options: ["4", "'22'", "NaN", "TypeError"], answer: 1 },
    { id: 17, question: "What will '2' - 1 evaluate to in JavaScript?", options: ["1", "'21'", "NaN", "TypeError"], answer: 0 },
    { id: 18, question: "Which method converts a JS object into a JSON string?", options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "Object.toJSON()"], answer: 1 },
    { id: 19, question: "Which method parses a JSON string into a JS object?", options: ["JSON.parse()", "JSON.stringify()", "JSON.toObject()", "Object.fromJSON()"], answer: 0 },
    { id: 20, question: "What does NaN stand for?", options: ["Not a Number", "Number and Null", "Null and Negative", "New Array Number"], answer: 0 },
    { id: 21, question: "Which event occurs when a user clicks an HTML element?", options: ["onchange", "onclick", "onmouseover", "onmouseclick"], answer: 1 },
    { id: 22, question: "How do you select an element by ID in the DOM?", options: ["document.getElement(id)", "document.getElementById(id)", "document.querySelector(#id)", "Both getElementById and querySelector"], answer: 3 },
    { id: 23, question: "Which array method creates a new array with transformed elements?", options: ["forEach()", "map()", "filter()", "reduce()"], answer: 1 },
    { id: 24, question: "Which array method filters elements based on a condition?", options: ["map()", "filter()", "find()", "slice()"], answer: 1 },
    { id: 25, question: "What is the purpose of Promise in JavaScript?", options: ["Handles synchronous operations", "Handles asynchronous operations", "Encapsulates CSS styles", "Validates form fields"], answer: 1 },
    { id: 26, question: "Which keyword pauses execution inside an async function?", options: ["yield", "await", "stop", "pause"], answer: 1 },
    { id: 27, question: "What does the 'this' keyword refer to in a regular function?", options: ["The function itself", "The object calling the function", "Always window object", "Global scope only"], answer: 1 },
    { id: 28, question: "Which operator is used for object/array destructuring?", options: ["{ } / [ ]", "...", "=>", "::"], answer: 0 },
    { id: 29, question: "Which operator spreads array or object properties?", options: ["Rest operator (...)", "Spread operator (...)", "Splice operator", "Slice operator"], answer: 1 },
    { id: 30, question: "What is the default value of an uninitialized variable?", options: ["null", "undefined", "0", "false"], answer: 1 },
    { id: 31, question: "Which method schedules execution after a specified delay?", options: ["setInterval()", "setTimeout()", "setDelay()", "wait()"], answer: 1 },
    { id: 32, question: "Which method repeatedly executes a function at fixed intervals?", options: ["setInterval()", "setTimeout()", "repeat()", "loop()"], answer: 0 },
    { id: 33, question: "How do you stop a setInterval execution?", options: ["stopInterval()", "clearInterval()", "endInterval()", "cancelInterval()"], answer: 1 },
    { id: 34, question: "Which statement skips current loop iteration and continues next?", options: ["break", "continue", "skip", "pass"], answer: 1 },
    { id: 35, question: "Which statement terminates a loop completely?", options: ["break", "continue", "stop", "exit"], answer: 0 },
    { id: 36, question: "What does Array.isArray([]) return?", options: ["true", "false", "undefined", "null"], answer: 0 },
    { id: 37, question: "Which method joins all array elements into a string?", options: ["join()", "concat()", "toString()", "Both join() and toString()"], answer: 3 },
    { id: 38, question: "Which method returns a section of an array without modifying original?", options: ["splice()", "slice()", "cut()", "split()"], answer: 1 },
    { id: 39, question: "Which method modifies array by removing/replacing elements?", options: ["slice()", "splice()", "split()", "pop()"], answer: 1 },
    { id: 40, question: "What is closure in JavaScript?", options: ["Function with outer variable access", "Method to close browser tab", "JSON serializer", "DOM event handler"], answer: 0 },
    { id: 41, question: "How to declare a Class in JavaScript?", options: ["class MyClass {}", "struct MyClass {}", "create Class MyClass {}", "function class MyClass {}"], answer: 0 },
    { id: 42, question: "Which method adds elements to start of an array?", options: ["push()", "unshift()", "shift()", "prepend()"], answer: 1 },
    { id: 43, question: "Which method removes first element from an array?", options: ["pop()", "shift()", "unshift()", "removeFirst()"], answer: 1 },
    { id: 44, question: "Which global object handles HTTP network requests?", options: ["fetch()", "XMLHttpRequest", "Axios", "Both fetch() and XMLHttpRequest"], answer: 3 },
    { id: 45, question: "What does localStorage store data as?", options: ["JSON objects", "Strings", "Binary data", "Arrays"], answer: 1 },
    { id: 46, question: "How do you remove an item from localStorage?", options: ["localStorage.removeItem(key)", "localStorage.delete(key)", "localStorage.clear(key)", "localStorage.remove(key)"], answer: 0 },
    { id: 47, question: "What does Event.preventDefault() do?", options: ["Stops event bubbling", "Prevents default browser action", "Deletes DOM node", "Cancels timer"], answer: 1 },
    { id: 48, question: "What does Event.stopPropagation() do?", options: ["Prevents default action", "Stops event bubbling up the DOM tree", "Stops JS execution", "Closes window"], answer: 1 },
    { id: 49, question: "What does Boolean('') evaluate to?", options: ["true", "false", "undefined", "NaN"], answer: 1 },
    { id: 50, question: "What does Boolean('Hello') evaluate to?", options: ["true", "false", "null", "undefined"], answer: 0 }
  ]
};

export default function AptitudeQuestions() {
  const [selectedTopic, setSelectedTopic] = useState('html');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setUserAnswers({});
    setScore(null);
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const currentQuestions = quizData[selectedTopic];

  const handleSubmit = (e) => {
    e.preventDefault();
    let calculatedScore = 0;

    currentQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);
  };

  const isFormComplete = Object.keys(userAnswers).length === currentQuestions.length;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Column: Educational Content Article */}
        <div className="lg:col-span-5 p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6 shadow-xl">
          <article className="space-y-6">
            <header className="border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">Web Development Fundamentals</span>
              <h1 className="text-2xl font-bold text-white mt-1">Mastering Core Frontend Aptitude: HTML, CSS & JavaScript</h1>
            </header>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">1. Core Concepts & Technical Standards</h2>
              <p>
                Developing web applications requires a clear understanding of frontend building blocks. HTML provides structural semantics, CSS controls layout presentation, and JavaScript enables interactivity.
              </p>
              <p>
                Aptitude evaluations focus on understanding syntax, default browser behavior, DOM API methods, and modern standards like ES6 and flexbox/grid layout systems.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">2. Essential Development Topics</h2>
              <p>
                Key areas covered across web technologies include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 pl-1">
                <li>
                  <strong className="text-slate-200">Semantic Markup:</strong> Using structural tags like <code className="text-blue-400">&lt;article&gt;</code>, <code className="text-blue-400">&lt;nav&gt;</code>, and accessibility attributes correctly.
                </li>
                <li>
                  <strong className="text-slate-200">Layout & Styling Logic:</strong> Understanding specificity rules, CSS units (rem vs px), and responsive media query techniques.
                </li>
                <li>
                  <strong className="text-slate-200">JavaScript Execution:</strong> Mastering variable scoping, asynchronous promises, array methods, and event propagation models.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white">3. Assessment Strategy</h2>
              <p>
                Working through standardized technical questions reinforces fundamental knowledge, helps identify knowledge gaps, and prepares developers for technical interviews and coding certification evaluations.
              </p>
            </section>
          </article>
        </div>

        {/* Right Column: Interactive Quiz Tool & Publisher Section */}
        <div className="lg:col-span-7 space-y-8">
          {/* Interactive Quiz Box */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl text-slate-100">
            <h1 className="text-3xl font-bold text-center mb-2">Aptitude Quiz</h1>
            <p className="text-center text-slate-400 text-sm mb-6">
              Select a programming language and answer all 50 questions to get your score.
            </p>

            {/* Language Switcher Tabs */}
            <div className="flex justify-center gap-3 mb-8">
              {[
                { id: 'html', label: 'HTML', icon: '🌐' },
                { id: 'css', label: 'CSS', icon: '🎨' },
                { id: 'javascript', label: 'JavaScript', icon: '⚡' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTopicChange(tab.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center gap-2 ${
                    selectedTopic === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {currentQuestions.map((q, qIdx) => (
                <div key={q.id} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <p className="font-semibold text-base mb-3">
                    {qIdx + 1}. {q.question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((option, optIdx) => {
                      const label = String.fromCharCode(65 + optIdx);
                      const isSelected = userAnswers[q.id] === optIdx;

                      return (
                        <button
                          type="button"
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`text-left p-3 rounded-lg border text-sm transition-all cursor-pointer flex items-center gap-2 ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500 text-white font-medium'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold text-blue-400">{label}.</span>
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="sticky bottom-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 shadow-2xl">
                <button
                  type="submit"
                  disabled={!isFormComplete}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isFormComplete
                    ? `Submit ${selectedTopic.toUpperCase()} Quiz`
                    : `Answer All Questions (${Object.keys(userAnswers).length}/50)`}
                </button>
              </div>
            </form>

            {score !== null && (
              <div className="mt-6 p-6 bg-emerald-950/80 border border-emerald-700/60 text-center rounded-xl text-emerald-200">
                <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                <p className="mt-2 text-lg">
                  Your Score: <span className="font-bold text-white text-2xl">{score}</span> / {currentQuestions.length}
                </p>
                <p className="text-sm mt-1 text-emerald-300">
                  Percentage: {((score / currentQuestions.length) * 100).toFixed(1)}%
                </p>
              </div>
            )}
          </div>

          {/* Publisher Content Section */}
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 text-sm leading-relaxed space-y-6">
            <section>
              <h3 className="text-lg font-bold text-white mb-2">About Web Development Aptitude Quizzes</h3>
              <p>
                Interactive quizzes allow developers to assess their foundational understanding across frontend technologies. Regular practice reinforces standard syntax, core terminology, and framework prerequisites.
              </p>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-2">How to Use This Quiz</h3>
              <ol className="list-decimal list-inside space-y-1.5 text-slate-400">
                <li>Select your desired topic using the top navigation buttons (HTML, CSS, or JavaScript).</li>
                <li>Answer all 50 multiple-choice questions for the selected category.</li>
                <li>Submit the form at the bottom to receive instant score metrics and feedback.</li>
              </ol>
            </section>

            <section>
              <h3 className="text-base font-semibold text-white mb-2">Frequently Asked Questions</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-slate-200">Can I retake the test?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Yes, switching categories or refreshing the page resets selected answers so you can retake quizzes anytime.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-200">Are my results stored on a server?</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    No, all state management and scoring logic run locally in your web browser.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

      </div>
    </div>
  );
}