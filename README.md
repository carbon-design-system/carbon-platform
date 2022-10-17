# Carbon Platform

> The platform for Carbon Design System includes packages and services that are used by Carbon's
> website and the backend that supports it.

<p align="center">
  <a href="https://github.com/carbon-design-system/carbon/blob/master/LICENSE">
    <img
      src="https://img.shields.io/badge/license-Apache--2.0-blue.svg"
      alt="Carbon is released under the Apache-2.0 license"
    />
  </a>
  <a href="https://github.com/carbon-design-system/carbon-platform/blob/master/docs/CONTRIBUTING.md">
    <img
      src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"
      alt="PRs welcome"
    />
  </a>
  <a href="https://sonarcloud.io/dashboard?id=carbon-design-system_carbon-platform">
    <img
      src="https://sonarcloud.io/api/project_badges/measure?project=carbon-design-system_carbon-platform&metric=alert_status"
      alt="Quality gate status"
    />
  </a>
  <a href="https://github.com/carbon-design-system/carbon-platform/actions/workflows/ci-checks.yml">
    <img
      src="https://github.com/carbon-design-system/carbon-platform/actions/workflows/ci-checks.yml/badge.svg"
      alt="Continuous Integration Checks status"
    />
  </a>
  <a href="https://github.com/carbon-design-system/carbon-platform/actions/workflows/nightly.yml">
    <img
      src="https://github.com/carbon-design-system/carbon-platform/actions/workflows/nightly.yml/badge.svg"
      alt="Nightly Build job status"
    />
  </a>
</p>

## Quality metrics

[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=carbon-design-system_carbon-platform&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=carbon-design-system_carbon-platform)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=carbon-design-system_carbon-platform&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=carbon-design-system_carbon-platform)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=carbon-design-system_carbon-platform&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=carbon-design-system_carbon-platform)

[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=carbon-design-system_carbon-platform&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=carbon-design-system_carbon-platform)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=carbon-design-system_carbon-platform&metric=bugs)](https://sonarcloud.io/summary/new_code?id=carbon-design-system_carbon-platform)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=carbon-design-system_carbon-platform&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=carbon-design-system_carbon-platform)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=carbon-design-system_carbon-platform&metric=coverage)](https://sonarcloud.io/summary/new_code?id=carbon-design-system_carbon-platform)

## Deployments

| Environment                                       | Description                      |
| ------------------------------------------------- | -------------------------------- |
| [Production](https://next.carbondesignsystem.com) | Main deployment. Updated weekly. |
| [Test](https://next-test.carbondesignsystem.com)  | Test environment. Updated daily. |

## Getting started

If you're just getting started, here are some links so you can learn more about what we're working
on and what we have planned for the future.

| Process                                                                                                                                                                                                                                | Description                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Releases](https://app.zenhub.com/workspaces/platform-product-management-624ca9397d28730018df40c2/reports/release)                                                                                                                     | Releases are documented in Zenhub and are organized by time-based deliverables. Each release has an estimated release date and a description of high-level outcomes.                                                                                                                           |
| [Design Sprints](https://app.zenhub.com/workspaces/platform-design-624ca8ad03d709001dc542bf/reports/burndown), [Development Sprints](https://app.zenhub.com/workspaces/platform-development-624c3fc8b7972e001130fef7/reports/burndown) | The team's two-week sprints are managed through Zenhub. Each sprint tracks GitHub Issues through to completion.                                                                                                                                                                                |
| [Epics](https://github.com/carbon-design-system/carbon-platform/issues?q=is%3Aissue+is%3Aopen+label%3AEpic)                                                                                                                            | Epics are documented as GitHub Issues with the `Epic` label and contain Issues related by subject. As epics are not related by time, epics can span multiple sprints.                                                                                                                          |
| [Issues](https://github.com/carbon-design-system/carbon-platform/issues)                                                                                                                                                               | GitHub Issues are the team's smallest unit of work and are typically labeled by `type:` (e.g. bug or enhancement), `role:` (which skillsets are required to complete) and if the Issue is a bug, its `impact:` (how many users are affected) and `severity:` (what functionality is affected.) |
| [Roadmap](https://app.zenhub.com/workspaces/platform-product-c-624ca9397d28730018df40c2/roadmap)                                                                                                                                       | A visual overview of the releases and their epics.                                                                                                                                                                                                                                             |

## Developer docs

https://carbon-design-system.github.io/carbon-platform/

## Kubernetes config repo

[https://github.com/carbon-design-system/carbon-platform-k8s](https://github.com/carbon-design-system/carbon-platform-k8s)
