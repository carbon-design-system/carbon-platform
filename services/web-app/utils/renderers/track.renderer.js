/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/** @type {import('@carbon-platform/rmdx').Renderer} */
export const TrackRenderer = ({ src, srcLang, kind, default: defaultTrackProp }) => (
  <track src={src} srcLang={srcLang} kind={kind} default={defaultTrackProp} />
)
