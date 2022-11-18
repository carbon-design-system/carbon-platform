import Image from 'next/image'

/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
export const ImgMapper = ({ src, alt }) => <Image src={src} alt={alt} layout="fill" />
