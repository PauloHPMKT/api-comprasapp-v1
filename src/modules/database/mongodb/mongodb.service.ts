import { MongoClient } from 'mongodb';

export class MongoDbService {
  private client: MongoClient;

  async connect(uri: string): Promise<void> {
    this.client = new MongoClient(uri);
    await this.client.connect();
  }

  async disconnect(): Promise<void> {
    if (this.client) await this.client.close();
  }
}
