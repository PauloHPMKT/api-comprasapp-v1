import { Collection, MongoClient, ObjectId } from 'mongodb';

export interface MongoDBHelperTypes {
  client: MongoClient;

  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
  getCollection(name: string): Collection;
  map(collection: any): any;
  toObjectId(id: string): ObjectId;
}
