const {KiteTestError, Status, TestUtils} = require('kite-common');
const demo = require('../pages/AppPage');
const AppTestStep = require('../utils/AppTestStep');

class RosterCheck extends AppTestStep {

  constructor(kiteBaseTest, sessionInfo, numberOfParticipant, config = new RosterCheckConfig() ) {
    super(kiteBaseTest, sessionInfo);
    this.numberOfParticipant = numberOfParticipant;
    this.config = config;
  }

  static async executeStep(KiteBaseTest, sessionInfo, numberOfParticipant, config = new RosterCheckConfig()) {
    const step = new RosterCheck(KiteBaseTest, sessionInfo, numberOfParticipant, config);
    await step.execute(KiteBaseTest);
  }

  stepDescription() {
    return 'Check if all the users are on roster';
  }

  metricName() {
    return 'RosterCheck'
  }

  emitMetricToCommonNamespace() {
    return true
  }

  async run() {
    const rosterCheckPassed = await this.page.rosterCheck(this.numberOfParticipant, this.config.checkCount, this.config.waitTimeMs);
    if (!rosterCheckPassed) {
      throw new KiteTestError(Status.FAILED, 'Participants are not present on the roster');
    }
  }
}

class RosterCheckConfig {
  constructor(checkCount = 10, waitTimeMs = 100){
    this.checkCount = checkCount;
    this.waitTimeMs = waitTimeMs;
  }
}

module.exports.RosterCheck = RosterCheck;
module.exports.RosterCheckConfig = RosterCheckConfig;
