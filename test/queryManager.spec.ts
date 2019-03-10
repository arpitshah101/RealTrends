import * as chai from 'chai';
import 'mocha';

import { QueryManager } from '../src/modules/queryManager';

describe('QueryManager', () => {
    describe('testQuery', () => {
        it('should return an object with SOLUTION equal to 2', (done) => {
            QueryManager.testQuery()
                .then((result) => {
                    chai.assert(result.SOLUTION === 2, 'result.SOLUTION != 2');
                    done();
                });
        });
    });

    describe('getTopArtists', () => {
        it('should return an array with {name: string, sc: number}', (done) => {
            QueryManager.getTopArtists()
                .then((results) => {
                    chai.assert(Array.isArray(results), 'Result is not an array');
                    chai.assert(results[0].name, 'name property does not exist within a result object');
                    chai.assert(results[0].sc, 'sc property does not exist within a result object');
                })
                .then(done)
                .catch((reason) => {
                    done(reason);
                });
        });
    });

    describe('getArtistScore', () => {
        it('should return an array with {name: string, sc: number}', (done) => {
            QueryManager.getArtistScore('Tschabalala Self')
                .then((results) => {
                    chai.assert(results.length > 0);
                    console.log(results);
                })
                .finally(done)
                .catch((reason) => {
                    done(reason);
                });
        });
    });

    describe('getArtistAcceleration', () => {
        it('should get correct acceleration for Patricia Fernandez', (done) => {
            QueryManager.getArtistAcceleration('Patricia Fernandez')
                .then((results) => {
                    chai.assert(results.length > 0);
                    console.log(results); // should be ~6.0833
                })
                .finally(done)
                .catch((reason) => {
                    done(reason);
                });
        });
    });

    describe('getArtistRank', () => {
        it('should get artist rank', (done) => {
            QueryManager.getArtistRank('Patricia Fernandez')
                .then((results) => {
                    chai.assert(results.length > 0);
                    console.log(results);
                })
                .finally(done)
                .catch((reason) => {
                    done(reason);
                });
        });
    });

    describe('getArtistRankByAcceleration', () => {
        it('should get artist rank by acceleration', (done) => {
            QueryManager.getArtistRankByAcceleration('Partricia Fernandez')
                .then((results) => {
                    chai.assert(results.length > 0);
                    console.log(results);
                })
                .finally(done)
                .catch((reason) => {
                    done(reason);
                });
        });
    });

    describe.only('getArtistHeadlineDomains', () => {
        it('should get a list of domains mentioning artist in headlines', (done) => {
            QueryManager.getArtistHeadlineDomains('Ai Weiwei')
                .then((results) => {
                    chai.assert(results.length > 0);
                    console.log(results);
                })
                .finally(done)
                .catch(reason => {
                    done(reason);
                });
        });
    });
});
