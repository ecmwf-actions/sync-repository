# sync-repository

[![Changelog](https://img.shields.io/github/package-json/v/dvuckovic/sync-repository)](CHANGELOG.md)
[![Build Status](https://img.shields.io/github/workflow/status/dvuckovic/sync-repository/ci/main)](https://github.com/dvuckovic/sync-repository/actions/workflows/ci.yml?query=branch:main)
[![Licence](https://img.shields.io/github/license/dvuckovic/sync-repository)](https://github.com/dvuckovic/sync-repository/blob/main/LICENSE)

A Github action to sync a Git repository.

## Features

* Syncs the current Git repository branch/tag
* Supports both source and target authentication (`HTTPBasicAuth`)

## Supported Operating Systems

* Linux
* macOS

## Usage

### Current Repository

```yaml
steps:
- name: Sync Repository
  uses: dvuckovic/sync-repository@v1
  with:
    target_repository: ecsdk/ecbuild
    target_username: ${{ secrets.BITBUCKET_USERNAME }}
    target_token: ${{ secrets.BITBUCKET_PAT }}
```

### Remote Repository

```yaml
steps:
- name: Sync Repository
  uses: dvuckovic/sync-repository@v1
  with:
    source_repository: ecmwf/ecbuild
    source_token: ${{ secrets.GH_PAT }}
    target_repository: ecsdk/ecbuild
    target_username: ${{ secrets.BITBUCKET_USERNAME }}
    target_token: ${{ secrets.BITBUCKET_PAT }}
```

## Inputs

### `source_repository`

**Required** The name of the source repository.  
**Default:** `${{ github.repository }}`

### `source_ref`

**Required** The name of the source repository branch or tag to sync.  
**Default:** `${{ github.ref }}`

### `source_username`

**Required** The user login with read access to the source repository, must be URL-encoded.  
**Default:** `git`

### `source_token`

**Required** The user access token with read access to the source repository, must be URL-encoded.  
**Default:** `${{ github.token }}`

### `source_host`

**Required** The host name and realm of the source Git server.  
**Default:** `github.com`

### `target_repository`

**Required** The name of the target repository.

### `target_username`

**Required** The user login with write access to the target repository, must be URL-encoded.

### `target_token`

**Required** The user access token with write access to the target repository, must be URL-encoded.

### `target_host`

**Required** The host name and realm of the target Git server.  
**Default:** `git.ecmwf.int/scm`

## Development

### Install Dependencies

```
npm install
```

### Composite Action

This is a composite action that is provided only via an `action.yml` definition file. Therefore, there is no need to build it and can only be tested by parsing the YAML file.

### Run Tests

```
npm test
```

## Licence

This software is licensed under the terms of the Apache License Version 2.0 which can be obtained at http://www.apache.org/licenses/LICENSE-2.0.

In applying this licence, ECMWF does not waive the privileges and immunities granted to it by virtue of its status as an intergovernmental organisation nor does it submit to any jurisdiction.
