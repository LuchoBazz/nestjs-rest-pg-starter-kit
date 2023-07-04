---
sidebar_position: 1
---

# Feature Flags

### Introduction

This document provides details about the feature flags used in our project and their current status. Feature flags are a technique that allows us to enable or disable functionalities in a controlled and gradual manner. This enables us to test and deploy features independently and reduce the impact of changes.

### Conventions

* **Feature Flag Name:** Descriptive name of the feature flag.
* **Description:** Brief description of the functionality enabled or disabled by the feature flag.
* **Type:** Type of feature flag, can be `BOOLEAN`, `ENUM`, `JSON`
* **Possibles Values:** List of possible values
* **Context:** Context in which the feature flag is used.

## List of Feature Flags

Below is the list of feature flags used in the project:

### `AUTH_PROVIDER`

* **Description:** [Brief description of the functionality enabled or disabled by the feature flag].
* **Type:** `ENUM`
* **Possible Values:** `FIREBASE`, `SUPABASE`.
* **Context:** [Usage context].

## Conclusions

The use of feature flags provides us with flexibility and control over the features that are deployed in our project. Keeping this documentation up to date is crucial to have a clear understanding of the enabled and disabled functionalities, as well as the impact on users.

Remember to update this documentation whenever a feature flag is added, modified, or removed in the project.

I hope this format is helpful for documenting your feature flags! If you have any other questions, I'll be happy to assist you!