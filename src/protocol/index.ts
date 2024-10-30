import { env } from "~/env.js";
import { readString, writeString } from "./common.js";
import { packetDefinitions } from "./packets.js";

export type Packet<T> = {
  className: string;
  uuid?: string;
  body?: T;
};
export function bigIntReviver(key: string, value: any): any {
  if (typeof value === "string" && value.startsWith("bigint:")) {
    return BigInt(value.substring("bigint:".length));
  }
  return value;
}

(BigInt.prototype as any).toJSON = function () {
  return "bigint:" + this.toString();
};

export const decodePacket = (
  packetIdMap: Record<number, string>,
  buffer: Buffer
) => {
  try {
    const view = new DataView(buffer.buffer);
    const id = view.getInt32(0);
    const className = packetIdMap[id];

    if (!className) return null;
    const uuid = readString(view, 4);
    const bodyStr = readString(view, 8 + uuid.length).replace(
      /:\d{15,}/g,
      (num) => ':"bigint' + num + '"'
    );
    if (env.PACKET_LOG == "yes")
      console.log(className + "[" + id + "]: " + bodyStr);
    const packetDefinition = packetDefinitions.find(
      (a) => a.className == className
    );

    if (!packetDefinition) return null;

    const body = packetDefinition.body.safeParse(
      JSON.parse(bodyStr, bigIntReviver)
    ).data;

    if (!body) return null;

    return {
      className,
      uuid,
      body,
    } as Packet<any>;
  } catch (error) {
    return null;
  }
};

export const encodePacket = (
  packetIdMap: Record<string, number>,
  packet: Packet<any>
) => {
  try {
    const id = packetIdMap[packet.className];
    if (!id) return null;
    const bodyStr = JSON.stringify(packet.body).replace(
      /"bigint:(\d{15,})"/g,
      (_, num) => num
    );

    const view = new DataView(
      Buffer.alloc(
        4 + // id
          4 + // uuid len
          (packet.uuid ?? "").length + // uuid
          4 + // body len
          bodyStr.length // body
      ).buffer
    );

    if (env.PACKET_LOG == "yes")
      console.log("P->C: " + packet.className + "[" + id + "]: " + bodyStr);

    view.setInt32(0, parseInt(id as any));
    writeString(view, 4, packet.uuid ?? "");
    writeString(view, 8 + (packet.uuid?.length ?? 0), bodyStr);

    return view.buffer;
  } catch (error) {
    return null;
  }
};
