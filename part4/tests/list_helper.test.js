const dummy = require('../utils/list_helper.js').dummy

test('dummy test', () => {
    expect(dummy()).toBe(1)
})