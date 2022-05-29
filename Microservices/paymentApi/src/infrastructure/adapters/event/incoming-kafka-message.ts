export interface IncomingKafkaMessage<
  V = unknown,
  K = unknown,
  H = Record<string, unknown>,
> {
  magicByte: number;
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: K;
  value: V;
  headers: H;
  isControlRecord: boolean;
  batchContext: {
    firstOffset: string;
    firstTimestamp: string;
    partitionLeaderEpoch: number;
    inTransaction: boolean;
    isControlBatch: boolean;
    lastOffsetDelta: number;
    producerId: string;
    producerEpoch: number;
    firstSequence: number;
    maxTimestamp: string;
    magicByte: number;
  };
}
