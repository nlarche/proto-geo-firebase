import test from 'ava';
import { expect } from 'chai';

import currentPosition from '../currentPosition.js';

test.cb('currentPosition', t => {   

    currentPosition(function (test) {
        expect(test).to.be.a('object');
        expect(test).to.have.property('latitude');
        expect(test).to.have.property('longitude');        
        expect(test.latitude).to.be.a('number');
        expect(test.longitude).to.be.a('number');
        t.end();
    });
});