# Technical authority matrix

## Purpose

The explainer is not a compatibility calculator and must never imply one. This matrix makes every topic declare the owner, product scope, mandatory evidence and rule families that govern its technical claims.

## Publication rule

A topic is technically ready only when all of the following are true:

- its authority profile exists;
- every mandatory evidence item exists, is current and belongs to its declared manufacturer or standards authority;
- evidence identifies a product, release/reference and stable source;
- the diagram integrity profile is `reviewed`;
- a qualified human reviewer marks the topic `reviewed`.

Otherwise the authority audit blocks publication readiness. A topic can remain visible as a conceptual explainer, but it cannot be represented as technically approved for implementation or support.

## Multi-vendor architectures

Evidence can name a distinct owner when a topic legitimately crosses vendors. Each source is checked against that individual owner. The system never accepts a Veeam, IBM or Aruba source as proof of a Broadcom rule merely because they coexist in one architecture.

## Operations

Run `npm run report:technical-authority` to list ready topics and precise blockers. It exits unsuccessfully while any topic is blocked, which makes it suitable for a release gate.

## Current state

The initial audit intentionally reports all topics as blocked because expert review has not been asserted. This is the correct state: source presence is evidence, not approval.
