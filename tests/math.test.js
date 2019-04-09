const {calculateTip, fahrenheitToCelsius, celsiusToFahrenheit} = require("../src/math");

test("Should calcualte total with tip", () => {
    const total = calculateTip(10, .3);
    expect(total).toBe(13);
})

test("Should calculate total with default tip", () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
})

test("should convert 32 f to 0 c", () => {
    const total = fahrenheitToCelsius(32);
    expect(total).toBe(0);
})

test("should convert 0 c to 32 f", () => {
    const total = celsiusToFahrenheit(0);
    expect(total).toBe(32);
})

test('async test', (done) => {
    setTimeout(() => {
        expect(1).toBe(1);
        done();
    }, 2000)

})