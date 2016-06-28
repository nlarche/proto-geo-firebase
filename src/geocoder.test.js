import test from 'ava';
import { expect } from 'chai';

import geocoder from './geocoder.js';

test.cb('geocoder', t => {

    geocoder('Champ de Mars, 5 Avenue Anatole France, 75007 Paris', function (test) {
        expect(test).to.be.a('array');
        expect(test[0]).to.have.property('lattitude');
        expect(test[0]).to.have.property('longitude');        
        expect(test[0].longitude).to.be.a('number');
        expect(test[0].longitude).to.be('number');
        t.end();
    });
});