const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

test('payment details remain private in stored and streamed analytics', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'analytics-test-'));
  try {
    fs.mkdirSync(path.join(dir, 'data'));
    fs.writeFileSync(path.join(dir, 'data/analytics.json'), JSON.stringify({days:{'2026-10-02':{views:1,clicks:0,signups:0,payments:1,byReferrer:{google:{views:1,clicks:0,signups:0,payments:1}},byCampaign:{},paymentDetails:[{billingEmail:'private@example.com',accountId:'acc_private',stripeCustomerId:'cus_private'}]}}}));
    const source = fs.readFileSync(path.join(__dirname, '../src/lib/server/analytics.ts'), 'utf8');
    const js = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
    const exports = {};
    const scopedPath = {...path, resolve: (...parts) => path.resolve(dir, ...parts)};
    vm.runInNewContext(js, {exports, require: (name) => name === 'path' ? scopedPath : require(name), TextEncoder, URL, Date});
    const events = [];
    exports.addClient({enqueue: value => events.push(Buffer.from(value).toString())});
    assert.equal(exports.getAll().days['2026-10-02'].payments, 1);
    assert.doesNotMatch(JSON.stringify(exports.getAll()), /private@example|acc_private|cus_private|paymentDetails/);
    exports.recordEvent('payments','google','unknown',{billingEmail:'new@example.com',accountId:'acc_new'});
    const stored = JSON.parse(fs.readFileSync(path.join(dir, 'data/analytics.json')));
    const today = new Date().toISOString().slice(0,10);
    assert.equal(stored.days[today].payments, 1);
    assert.equal(stored.days[today].paymentDetails[0].billingEmail, 'new@example.com');
    assert.equal(stored.days[today].paymentDetails[0].accountId, 'acc_new');
    assert.doesNotMatch(events.join(''), /example\.com|acc_new|cus_private|paymentDetails/);
    exports.broadcastNotification({device:'Other',referrer:'person@example.com',campaign:'cus_private',time:'now'});
    assert.doesNotMatch(events.join(''), /person@example|cus_private/);
    exports.recordEvent('payments','google','unknown');
    assert.equal(exports.getAll().days[today].payments, 2);
  } finally { fs.rmSync(dir, {recursive:true, force:true}); }
});
