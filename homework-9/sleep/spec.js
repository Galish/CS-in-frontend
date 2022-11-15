import jest from 'jest-mock'

import sleep from './sleep'

describe('Sleep (asynchronous setTimeout alternative)', () => {

	it('zero timeout', () => {
		expect(
			sleep().then(() => `I'am awake!`)
		).resolves.toBe(`I'am awake!`);
	});

	it('non-zero timeout', () => {
		expect(
			sleep(100).then(() => `I'am awake!`)
		).resolves.toBe(`I'am awake!`);
	});

});
