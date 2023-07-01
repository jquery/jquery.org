# jquery.org

## Building and Deploying

To build and deploy your changes for previewing in a [`jquery-wp-content`](https://github.com/jquery/jquery-wp-content) instance, follow the [workflow instructions](http://contribute.jquery.org/web-sites/#workflow) from our documentation on [contributing to jQuery Foundation web sites](http://contribute.jquery.org/web-sites/).

### Foundation Documents

Some of the pages for jquery.org come from jQuery Foundation documents stored in a separate repository. Whenever those documents are updated, they should be copied to this repo via `grunt copy-foundation-docs`. Newly created documents must be added to the list in the grunt file. After the grunt task runs, you should review, add, commit, and push the update. Running this task requires access to the foundation repository, as well as adding a `githubToken` property to your `config.json`. You can generate a personal access token at https://github.com/settings/applications.
