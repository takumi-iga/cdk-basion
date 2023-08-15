#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkBasionStack } from '../lib/cdk-basion-stack';

const app = new cdk.App();
new CdkBasionStack(app, 'CdkBasionStack');
