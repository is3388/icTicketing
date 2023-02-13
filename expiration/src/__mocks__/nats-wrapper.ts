export const natsWrapper = {
  // fake implementation which includes mock function that will invoke when try to run publish
  // the client object will be constructed in base-publisher.ts
  /*client: {
    publish:(subject: string, data: string, callback: () => void) => {
      callback()
    }
  }*/
  // it is reusable for every test and internally records no. of times get called and different args
  // need to clear those info between tests, thus go to setup file and clear
  client: {
    publish: jest
      .fn()
      .mockImplementation((subject: string, data: string, callback: () => void ) => {
    callback() // invoke callback
    })
  }
}