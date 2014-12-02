# jquery.org

## Building and Deploying

To build and deploy your changes for previewing in a [`jquery-wp-content`](https://github.com/jquery/jquery-wp-content) instance, follow the [workflow instructions](http://contribute.jquery.org/web-sites/#workflow) from our documentation on [contributing to jQuery Foundation web sites](http://contribute.jquery.org/web-sites/).

### Foundation Documents

Some of the pages for jquery.org come from jQuery Foundation documents stored in a separate repository. Whenever those documents are updated, they should be copied to this repo via `grunt copy-foundation-docs`. Newly created documents must be added to the list in the grunt file. After the grunt task runs, you should review, add, commit, and push the update. Running this task requires access to the foundation repository, as well as adding a `githubToken` property to your `config.json`. You can generate a personal access token at https://github.com/settings/applications.

### Stripe Integration

In order to test the member join page, you will need a [Stripe](https://stripe.com/) account. Once you've created an account, you'll need to add your test keys to your `wp-config.php` file in the WordPress install that you're using for [jquery-wp-content](https://github.com/jquery/jquery-wp-content).

```php
define( 'STRIPE_PUBLIC', 'your-public-key-here' );
define( 'STRIPE_SECRET', 'your-secret-key-here' );
```

You will also need to create plans in your Stripe account with the following ids: `fan-3mo`, `fan-12mo`, `friend-3mo`, `friend-12mo`, `hero-3mo`, `hero-12mo`. You can enter any information you want for the rest of the plan details, only the id is important for this integration.
