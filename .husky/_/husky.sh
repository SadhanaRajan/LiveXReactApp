#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  export husky_skip_init=1
  . "$(dirname "$0")/husky.sh"
fi

