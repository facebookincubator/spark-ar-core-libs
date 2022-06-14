/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export function encodeMessage(metaData, syncMessage) {
  const metaDataStr = JSON.stringify(metaData);
  const metaDataBuf = Uint8Array.from(metaDataStr, s => s.charCodeAt(0));
  const metaDataLength = metaDataBuf.length;
  const metaDataLengthSize = 1,
    nonZeroPaddingSize = 1;
  const totalSize = metaDataLengthSize + metaDataLength + syncMessage.length + nonZeroPaddingSize;

  let msg = new Uint8Array(totalSize);
  msg[0] = metaDataLength;
  // Set meta data buffer in the message
  msg.set(metaDataBuf, metaDataLengthSize);
  // Set sync message buffer in the message
  msg.set(syncMessage, metaDataLengthSize + metaDataLength);
  // append non zero byte at end of buffer
  // Currently messenger infrastructure is trimming all 0s in the buffer
  // Having last byte as 1 to avoid this
  // Will remove it once messenger team correct this trimming on their side
  msg[totalSize - 1] = 1;

  return msg;
}

export function decodeMessage(msg) {
  const metaDataLengthSize = 1,
    nonZeroPaddingSize = 1;
  const metaDataLength = msg[0];
  const totalSize = msg.length;

  // Decode meta data from msg to JSON
  const metaDataBuf = msg.subarray(metaDataLengthSize, metaDataLengthSize + metaDataLength);
  const metaData = JSON.parse(String.fromCharCode(...metaDataBuf));
  // Decode sync message
  const syncMessage = msg.subarray(
    metaDataLengthSize + metaDataLength,
    totalSize - nonZeroPaddingSize,
  );

  return [metaData, syncMessage];
}
