/*
 * Copyright IBM Corp. 2022, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Controller, Injectable, Module } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'

/**
 * This export is a wrapper around NestJS objects and is used to keep all platform microservices on
 * the same version of NestJS. NestJS objects and constructs should only be accessed through this
 * export. More NestJS things can be added to this export as needed.
 */
const Nest = {
  Controller,
  EventPattern,
  Injectable,
  MessagePattern,
  Module,
  Payload
}

export { Nest }
