jquery.org
==========

## Building

### Build

To build and deploy your changes for previewing in a [jquery-wp-content](https://github.com/jquery/jquery-wp-content) instance, follow the [workflow instructions](http://contribute.jquery.org/web-sites/#workflow) from our documentation on [contributing to jQuery Foundation web sites](http://contribute.jquery.org/web-sites/).

### Stripe Integration

In order to test the member join page, you will need a [Stripe](https://stripe.com/) account. Once you've created an account, you'll need to add your test keys to your `wp-config.php` file in the WordPress install that you're using for [jquery-wp-content](https://github.com/jquery/jquery-wp-content).

```php
define( 'STRIPE_PUBLIC', 'your-public-key-here' );
define( 'STRIPE_SECRET', 'your-secret-key-here' );
```

You will also need to create plans in your Stripe account with the following ids: `fan-3mo`, `fan-12mo`, `friend-3mo`, `friend-12mo`, `hero-3mo`, `hero-12mo`. You can enter any information you want for the rest of the plan details, only the id is important for this integration.
