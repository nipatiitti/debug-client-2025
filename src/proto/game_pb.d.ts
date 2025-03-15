import * as jspb from 'google-protobuf'



export class IncrementalMapUpdateRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IncrementalMapUpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: IncrementalMapUpdateRequest): IncrementalMapUpdateRequest.AsObject;
  static serializeBinaryToWriter(message: IncrementalMapUpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IncrementalMapUpdateRequest;
  static deserializeBinaryFromReader(message: IncrementalMapUpdateRequest, reader: jspb.BinaryReader): IncrementalMapUpdateRequest;
}

export namespace IncrementalMapUpdateRequest {
  export type AsObject = {
  }
}

export class IncrementalMapUpdateResponse extends jspb.Message {
  getUpdatesList(): Array<IncrementalMapUpdateResponse.IncrementalMapUpdate>;
  setUpdatesList(value: Array<IncrementalMapUpdateResponse.IncrementalMapUpdate>): IncrementalMapUpdateResponse;
  clearUpdatesList(): IncrementalMapUpdateResponse;
  addUpdates(value?: IncrementalMapUpdateResponse.IncrementalMapUpdate, index?: number): IncrementalMapUpdateResponse.IncrementalMapUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IncrementalMapUpdateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IncrementalMapUpdateResponse): IncrementalMapUpdateResponse.AsObject;
  static serializeBinaryToWriter(message: IncrementalMapUpdateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IncrementalMapUpdateResponse;
  static deserializeBinaryFromReader(message: IncrementalMapUpdateResponse, reader: jspb.BinaryReader): IncrementalMapUpdateResponse;
}

export namespace IncrementalMapUpdateResponse {
  export type AsObject = {
    updatesList: Array<IncrementalMapUpdateResponse.IncrementalMapUpdate.AsObject>,
  }

  export class IncrementalMapUpdate extends jspb.Message {
    getSpawnrelativecoordinate(): RelativeCoordinate | undefined;
    setSpawnrelativecoordinate(value?: RelativeCoordinate): IncrementalMapUpdate;
    hasSpawnrelativecoordinate(): boolean;
    clearSpawnrelativecoordinate(): IncrementalMapUpdate;

    getType(): PixelTypes;
    setType(value: PixelTypes): IncrementalMapUpdate;

    getGuild(): PixelGuild;
    setGuild(value: PixelGuild): IncrementalMapUpdate;

    getOwner(): PixelUser | undefined;
    setOwner(value?: PixelUser): IncrementalMapUpdate;
    hasOwner(): boolean;
    clearOwner(): IncrementalMapUpdate;

    getBackgroundgraphic(): Uint8Array | string;
    getBackgroundgraphic_asU8(): Uint8Array;
    getBackgroundgraphic_asB64(): string;
    setBackgroundgraphic(value: Uint8Array | string): IncrementalMapUpdate;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IncrementalMapUpdate.AsObject;
    static toObject(includeInstance: boolean, msg: IncrementalMapUpdate): IncrementalMapUpdate.AsObject;
    static serializeBinaryToWriter(message: IncrementalMapUpdate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IncrementalMapUpdate;
    static deserializeBinaryFromReader(message: IncrementalMapUpdate, reader: jspb.BinaryReader): IncrementalMapUpdate;
  }

  export namespace IncrementalMapUpdate {
    export type AsObject = {
      spawnrelativecoordinate?: RelativeCoordinate.AsObject,
      type: PixelTypes,
      guild: PixelGuild,
      owner?: PixelUser.AsObject,
      backgroundgraphic: Uint8Array | string,
    }
  }

}

export class MiscStateUpdateRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MiscStateUpdateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MiscStateUpdateRequest): MiscStateUpdateRequest.AsObject;
  static serializeBinaryToWriter(message: MiscStateUpdateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MiscStateUpdateRequest;
  static deserializeBinaryFromReader(message: MiscStateUpdateRequest, reader: jspb.BinaryReader): MiscStateUpdateRequest;
}

export namespace MiscStateUpdateRequest {
  export type AsObject = {
  }
}

export class MiscStateUpdateResponse extends jspb.Message {
  getPixelbucket(): MiscStateUpdateResponse.PixelBucket | undefined;
  setPixelbucket(value?: MiscStateUpdateResponse.PixelBucket): MiscStateUpdateResponse;
  hasPixelbucket(): boolean;
  clearPixelbucket(): MiscStateUpdateResponse;

  getScoresList(): Array<MiscStateUpdateResponse.Scores>;
  setScoresList(value: Array<MiscStateUpdateResponse.Scores>): MiscStateUpdateResponse;
  clearScoresList(): MiscStateUpdateResponse;
  addScores(value?: MiscStateUpdateResponse.Scores, index?: number): MiscStateUpdateResponse.Scores;

  getPowerupsList(): Array<MiscStateUpdateResponse.PowerUps>;
  setPowerupsList(value: Array<MiscStateUpdateResponse.PowerUps>): MiscStateUpdateResponse;
  clearPowerupsList(): MiscStateUpdateResponse;
  addPowerups(value?: MiscStateUpdateResponse.PowerUps, index?: number): MiscStateUpdateResponse.PowerUps;

  getNotification(): MiscStateUpdateResponse.Notification | undefined;
  setNotification(value?: MiscStateUpdateResponse.Notification): MiscStateUpdateResponse;
  hasNotification(): boolean;
  clearNotification(): MiscStateUpdateResponse;

  getPowerupupdate(): boolean;
  setPowerupupdate(value: boolean): MiscStateUpdateResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MiscStateUpdateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MiscStateUpdateResponse): MiscStateUpdateResponse.AsObject;
  static serializeBinaryToWriter(message: MiscStateUpdateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MiscStateUpdateResponse;
  static deserializeBinaryFromReader(message: MiscStateUpdateResponse, reader: jspb.BinaryReader): MiscStateUpdateResponse;
}

export namespace MiscStateUpdateResponse {
  export type AsObject = {
    pixelbucket?: MiscStateUpdateResponse.PixelBucket.AsObject,
    scoresList: Array<MiscStateUpdateResponse.Scores.AsObject>,
    powerupsList: Array<MiscStateUpdateResponse.PowerUps.AsObject>,
    notification?: MiscStateUpdateResponse.Notification.AsObject,
    powerupupdate: boolean,
  }

  export class PixelBucket extends jspb.Message {
    getAmount(): number;
    setAmount(value: number): PixelBucket;

    getMaxamount(): number;
    setMaxamount(value: number): PixelBucket;

    getIncreaseperminute(): number;
    setIncreaseperminute(value: number): PixelBucket;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PixelBucket.AsObject;
    static toObject(includeInstance: boolean, msg: PixelBucket): PixelBucket.AsObject;
    static serializeBinaryToWriter(message: PixelBucket, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PixelBucket;
    static deserializeBinaryFromReader(message: PixelBucket, reader: jspb.BinaryReader): PixelBucket;
  }

  export namespace PixelBucket {
    export type AsObject = {
      amount: number,
      maxamount: number,
      increaseperminute: number,
    }
  }


  export class Scores extends jspb.Message {
    getGuild(): PixelGuild;
    setGuild(value: PixelGuild): Scores;

    getAmount(): number;
    setAmount(value: number): Scores;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Scores.AsObject;
    static toObject(includeInstance: boolean, msg: Scores): Scores.AsObject;
    static serializeBinaryToWriter(message: Scores, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Scores;
    static deserializeBinaryFromReader(message: Scores, reader: jspb.BinaryReader): Scores;
  }

  export namespace Scores {
    export type AsObject = {
      guild: PixelGuild,
      amount: number,
    }
  }


  export class PowerUps extends jspb.Message {
    getPowerupid(): number;
    setPowerupid(value: number): PowerUps;

    getDirected(): boolean;
    setDirected(value: boolean): PowerUps;

    getName(): string;
    setName(value: string): PowerUps;

    getDescription(): string;
    setDescription(value: string): PowerUps;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PowerUps.AsObject;
    static toObject(includeInstance: boolean, msg: PowerUps): PowerUps.AsObject;
    static serializeBinaryToWriter(message: PowerUps, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PowerUps;
    static deserializeBinaryFromReader(message: PowerUps, reader: jspb.BinaryReader): PowerUps;
  }

  export namespace PowerUps {
    export type AsObject = {
      powerupid: number,
      directed: boolean,
      name: string,
      description: string,
    }
  }


  export class Notification extends jspb.Message {
    getMessage(): string;
    setMessage(value: string): Notification;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Notification.AsObject;
    static toObject(includeInstance: boolean, msg: Notification): Notification.AsObject;
    static serializeBinaryToWriter(message: Notification, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Notification;
    static deserializeBinaryFromReader(message: Notification, reader: jspb.BinaryReader): Notification;
  }

  export namespace Notification {
    export type AsObject = {
      message: string,
    }
  }

}

export class PixelUser extends jspb.Message {
  getId(): number;
  setId(value: number): PixelUser;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PixelUser.AsObject;
  static toObject(includeInstance: boolean, msg: PixelUser): PixelUser.AsObject;
  static serializeBinaryToWriter(message: PixelUser, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PixelUser;
  static deserializeBinaryFromReader(message: PixelUser, reader: jspb.BinaryReader): PixelUser;
}

export namespace PixelUser {
  export type AsObject = {
    id: number,
  }
}

export class RelativeCoordinate extends jspb.Message {
  getX(): number;
  setX(value: number): RelativeCoordinate;

  getY(): number;
  setY(value: number): RelativeCoordinate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RelativeCoordinate.AsObject;
  static toObject(includeInstance: boolean, msg: RelativeCoordinate): RelativeCoordinate.AsObject;
  static serializeBinaryToWriter(message: RelativeCoordinate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RelativeCoordinate;
  static deserializeBinaryFromReader(message: RelativeCoordinate, reader: jspb.BinaryReader): RelativeCoordinate;
}

export namespace RelativeCoordinate {
  export type AsObject = {
    x: number,
    y: number,
  }
}

export enum PixelTypes { 
  NORMAL = 0,
  MAPBORDER = 1,
  SPAWN = 2,
  FOGOFWAR = 3,
}
export enum PixelGuild { 
  NOBODY = 0,
  TIETOKILTA = 1,
  ALGO = 2,
  CLUSTER = 3,
  OULUNTIETOTEEKKARIT = 4,
  TIETOTEEKKARIKILTA = 5,
  DIGIT = 6,
  SOSA = 7,
  DATE = 8,
  TUTTI = 9,
}
