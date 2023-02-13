import nats, { Stan } from 'node-nats-streaming'

class NatsWrapper {
  // create a nats client and assign it as a property of this class
  // once create an instance of this class, we will share the instance among all files inside this project
  // initialize the client in index.ts
  private _client?:Stan // put ? for TS to complain it supposes to initialize the client in constructor
  // we want to do it until we eventuallly try to call connect in index.ts
  // but we create a constructor for the class at the bottom
  get client() {
    if (!this._client) { // undefined
      throw new Error('Cannot access NATS client before connecting')
    }
    return this._client
  }
  connect(clusterId: string, clientId: string, url: string) {
    //this._client!= nats.connect(clusterId, clientId, {url})
    this._client = nats.connect(clusterId, clientId, { url, waitOnFirstConnect: true })
    
    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS')
        resolve()
      })
      this.client.on('error', (err) => {
        console.error(`Error when connecting to NATS: ${err}`)
        reject(err)
      })
    })
  }
}

export const natsWrapper = new NatsWrapper()