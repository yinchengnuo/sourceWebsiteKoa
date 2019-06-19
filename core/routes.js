const fuliaoLiveAuditRecord = require('../fuliaoLiveAuditRecord/route');
const fuliaoLiveWithoutFlash = require('../fuliaoLiveWithoutFlash/route');
const fuliaoVideochatAuditRecord = require('../fuliaoVideochatAuditRecord/route');
const fuliaoWebappVue = require('../fuliaoWebappVue/route');
const resumeIndexJquery = require('../resumeIndexJquery/route');

module.exports = [
    fuliaoLiveAuditRecord,
    fuliaoLiveWithoutFlash,
    fuliaoVideochatAuditRecord,
    fuliaoWebappVue,
    resumeIndexJquery
]