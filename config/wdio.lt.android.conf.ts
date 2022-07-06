import dotenv from 'dotenv';
import { GroupBrands } from '../src/helpers/Types';
import { SuiteName } from '../src/helpers/Utilities';
import { GEOLocations, GPSLocations, Languages } from './config.enums';
dotenv.config();

const buildSuiteName = SuiteName('Boohoo', 'Android', process.env.PRODUCTION, !!process.env.RERUN);

const instanceConfiguration = {
  auth_user: 'jordan.benyon',
  auth_pass: 'LMLarnQjku1uCTm6ifECmLovrr5zrLqNSDFu5NV73A3DeZ4iCt',
  app_id: 'lt://APP1001131655734059076719'
}

// Default Super Configuration
export const config = {
  product: 'appAutomation',
  rerun: !!process.env.RERUN,
  specs: [ '**/specs/redesign/skiplogin.spec.ts' ],
  exclude: [ ],
  user: instanceConfiguration.auth_user,
  key: instanceConfiguration.auth_pass,
  runner: 'local',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,  
    includeStackTrace: true,
    defaultTimeoutInterval: 60 * 60 * 1000, // Test shouldn't take more than an hour.
    helpers: [ ],
  },
  sync: true,
  logLevel: 'error',
  deprecationWarnings: true,
  bail: 0,
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 30 * 60 * 1000, // 30 minutes for webdriverio to try and keep connection.
  connectionRetryCount: 3,
  execArgv: [ '--no-wasm-code-gc' ],
  reporters: [ 'spec' ],
  
  // Clear keychain on iOS after ever test suite. used for local testing.
  after: async function (result: number): Promise<void> {
    if (driver.isIOS) {
      await driver.execute('mobile: clearKeychains');
    }
    const resultString = result === 0 ? 'passed' : 'failed';
    browser.executeScript('lambda-status=' + resultString);
  },
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      transpileOnly: true,
      project: 'tsconfig.json',
    },
  },

  // These are to be set in the direct config file that extends this.
  path: '/wd/hub',
  hostname: 'mobile-hub.lambdatest.com',
  port: 80,
  capabilities: [
    {
      maxInstances: 10,
      isRealMobile: true,
      visual: true,
      resignApp: false,
      network:true,
      idleTimeout: 300,
      devicelogs: true,
      project: buildSuiteName.project, 
      build: buildSuiteName.build,
      language: Languages.English,
      locale: GEOLocations.UK,
      location: {
        lat: GPSLocations.UK.Manchester.split(', ')[0],
        long: GPSLocations.UK.Manchester.split(', ')[1]
      },
      app: instanceConfiguration.app_id,
      platformName: 'Android',
      platformVersion: '10',
      deviceName: 'OnePlus.*,Pixel.*,Nexus.*,Huawei.*',
    },
  ],
  brand: GroupBrands.Boohoo,
  header: `${process.env.RERUN ? '[Re-run]' : ''} ${GroupBrands.Boohoo as string} mobile app UK`,
  project: buildSuiteName.project,
  build: buildSuiteName.build,
  name: null,
  
  services: [
    'lambdatest'   
  ]

};

exports.config = config;
