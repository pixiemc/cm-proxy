import { ZodArray, ZodObject, ZodType } from "zod";
import { readString, writeString } from "./common.js";
import { packetDefinitions } from "./packets.js";

export type Packet<T> = {
  className: string;
  uuid?: string;
  body?: T;
};

export const decodePacket = (
  packetIdMap: Record<number, string>,
  buffer: Buffer
) => {
  const view = new DataView(buffer.buffer);
  const id = view.getInt32(0);
  const className = packetIdMap[id];

  if (!className) return null;
  const uuid = readString(view, 4);
  const bodyStr = readString(view, 8 + uuid.length);
  console.log(className + "[" + id + "]: " + bodyStr);
  const packetDefinition = packetDefinitions.find(
    (a) => a.className == className
  );
  if (!packetDefinition) return null;

  const body = packetDefinition.body.parse(JSON.parse(bodyStr));
  if (!body) return null;

  return {
    className,
    uuid,
    body,
  } as Packet<any>;
};

export const encodePacket = (
  packetIdMap: Record<string, number>,
  packet: Packet<any>
) => {
  const id = packetIdMap[packet.className];
  if (!id) return null;

  const view = new DataView(
    Buffer.alloc(
      4 + // id
        4 + // uuid len
        (packet.uuid ?? "").length + // uuid
        4 + // body len
        JSON.stringify(packet.body).length // body
    ).buffer
  );

  console.log(
    "P->C: " + packet.className + "[" + id + "]: " + JSON.stringify(packet.body)
  );

  view.setInt32(0, parseInt(id as any));
  writeString(view, 4, packet.uuid ?? "");
  writeString(
    view,
    8 + (packet.uuid?.length ?? 0),
    JSON.stringify(packet.body)
  );

  return view.buffer;
};
