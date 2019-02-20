#!/bin/sh
# suorita komennolla ./deploy.sh
npm run build
cp -r build ../../fullstack_osa3
rm -rf build
