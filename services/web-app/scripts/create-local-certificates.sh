#!/bin/sh
#
# Copyright IBM Corp. 2021, 2021
#
# This source code is licensed under the Apache-2.0 license found in the
# LICENSE file in the root directory of this source tree.
#

CERTIFICATE_FILE_PATH=./certificates/localhost.crt
CERTIFICATE_KEY_FILE_PATH=./certificates/localhost.key

if  ! [ -f "$CERTIFICATE_FILE_PATH" ] || ! [ -f "$CERTIFICATE_KEY_FILE_PATH" ]; then
    if ! [ -x "$(command -v mkcert)" ]; then
      echo 'Error: mkcert is not installed.' >&2
      exit 1
    fi
  mkdir -p ./certificates

  mkcert \
    -cert-file="$CERTIFICATE_FILE_PATH" \
    -key-file="$CERTIFICATE_KEY_FILE_PATH" \
    localhost "*.localhost"
  echo 'certificates created'
fi

exit 0
