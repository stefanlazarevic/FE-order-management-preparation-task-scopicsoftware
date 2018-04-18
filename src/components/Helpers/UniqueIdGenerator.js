import moment from 'moment';
import padNumber from './padNumber';

const currentTimeStamp = moment();
const currentMonth = currentTimeStamp.month();
const currentYear = currentTimeStamp.year();

const mmYY = ('0' + (currentMonth + 1)).slice(-2) + (currentYear + '').slice(-2);

/**
 * ...
 * @param {Object} dataObjectToMap
 * @returns {String} generatedId - Id in format ORD-mmYY-xxx
 */
function UniqueIdGenerator(dataObjectToMap = {}) {

    let currentId = 0;

    for (let id in dataObjectToMap) {
        const idParts = id.split('-'); // ORD-mmYY-nnn

        /**
         * @private
         */
        const _mmYY = idParts[1]; // mmYY

        if (_mmYY === mmYY) {
            currentId = +idParts[2];
        }
    }

    return function getId() {
        return 'ORD-' + mmYY + '-' + padNumber(3, ++currentId);
    }
}

export default UniqueIdGenerator;
