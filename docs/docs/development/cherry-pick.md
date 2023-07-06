---
sidebar_position: 5
title: Cherry pick to Master
sidebar_label: Cherry pick to Master
---

## Cherry-pick a Commit from Development Branch to Master Branch

1. Ensure you are on the `master` branch. If not, switch to it using the following command:

   ```shell
   git checkout master

   git pull origin master
   ```

1. Create a new branch named `cherry-pick-commit-abc` based on the `master` branch. Use the following command to create and switch to the new branch:

    ```shell
    git checkout -b cherry-pick-commit-abc
    ```

    This will create a new branch called `cherry-pick-commit-abc` and switch to it.

1. Retrieve the commit hash of the commit you want to cherry-pick from the development branch. You can use the following command to view the commit history:

    ```shell
    git log
    ```

    Take note of the commit hash (e.g., `a1b2c3d`) associated with the commit you wish to cherry-pick.

1. Cherry-pick the desired commit onto the `cherry-pick-commit-abc` branch using the following command:

    ```shell
    git cherry-pick <commit-hash>
    ```

    Replace `<commit-hash>` with the actual commit hash from step 3.

1. If the cherry-pick process encounters conflicts, Git will pause and allow you to resolve them manually. Open the conflicting files, locate the conflicting changes, and modify them according to your needs.

    After resolving conflicts, use the following command to continue the cherry-pick process:

    ```shell
    git cherry-pick --continue
    ```

1. Once the cherry-pick is complete, the desired commit will be applied to the `cherry-pick-commit-abc` branch.

1. Verify that the cherry-picked commit is as expected by examining the changes using the following command:

    ```shell
    git log
    ```

    Ensure that the cherry-picked commit is now part of the `cherry-pick-commit-abc` branch's history.

1. Push the `cherry-pick-commit-abc` branch to the remote repository:

    ```shell
    git push origin cherry-pick-commit-abc
    ```

    This will make the `cherry-pick-commit-abc` branch and its changes accessible to others.

1. Create a pull request (PR) on the remote repository. Visit your repository's website, navigate to the `cherry-pick-commit-abc` branch, and follow the instructions to create a new pull request targeting the master branch.

    Provide a descriptive title and any additional context or information in the PR description.

1. Review the changes in the pull request and, if everything looks good, request a review from the relevant team members.

1. Once the PR has been reviewed and approved, merge the changes into the `master` branch.

Congratulations! You have successfully created the `cherry-pick-commit-abc` branch, performed the cherry-pick procedure, and created a pull request to merge the changes into the `master` branch.