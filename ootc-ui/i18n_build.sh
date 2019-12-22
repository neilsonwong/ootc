#!/usr/bin/env bash

echo 'building for en, zh-hant, zh-hans';

ng build --aot --prod &
ng build --aot --prod --configuration=zh-hk &
ng build --aot --prod --configuration=zh-cn &
wait

echo 'done building for en, zh-hant, zh-hans';
