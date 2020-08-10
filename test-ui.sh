#!/bin/bash
cd ui/
REACT_APP_GIT_SHA=`git rev-parse --short HEAD` REACT_APP_ONECC_VERSION=`../server/depends/oneCC/oneCC --version` npm start