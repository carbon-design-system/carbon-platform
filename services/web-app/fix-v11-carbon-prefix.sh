#!/bin/sh

sed -i .bak "s/prefix: 'bx',/prefix: 'cds',/" "../../node_modules/carbon-components/es/globals/js/settings.js"
sed -i .bak "s/prefix: 'bx',/prefix: 'cds',/" "./node_modules/carbon-components/es/globals/js/settings.js"

exit 0