function foo() {
    a = 1;
    bar();
    var b = 2;
    var c = 3;
    c = a;
    if (a == c)
        console.log('equal');

    console.log('Hello');
}

function bar() {
    return true;
}
//# sourceMappingURL=app.js.map
