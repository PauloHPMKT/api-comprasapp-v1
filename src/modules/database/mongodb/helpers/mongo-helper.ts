import { Collection, MongoClient, ObjectId } from 'mongodb';
import { MongoDBHelperTypes } from '../types/mongodb.types';

export const MongoHelper: MongoDBHelperTypes = {
  client: null as MongoClient | null,

  async connect(uri: string): Promise<void> {
    if (this.client) {
      await this.disconnect();
    }
    this.client = new MongoClient(uri);
    await this.client.connect();
  },

  async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
    }
  },

  getCollection(name: string): Collection {
    return this.client.db().collection(name);
  },

  map(document: any): any {
    const { _id, ...rest } = document;
    return { ...rest, id: _id };
  },

  toObjectId(id: string): ObjectId {
    return new ObjectId(id);
  },
};
