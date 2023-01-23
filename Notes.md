# What has been done

## Logout

- Logout functionality wasn't implemented, added some code call the logout api, delete the `token` from localstorage and redirect to the login page

## Login page

- Submit button
  - Added some additional state to disable the submit button when the form is validating/submitting
- Loader
  - Created a generic loader component (spinner)
  - Created a generic overlay component
  - Added the overlay/loader components to the login page - they are used when the form is submitting
- Login page error messages
  - Added additional checks before making the login call - we don't need to call the login service if either `username` or `password` is not filled in. Added additional error messages for these two scenarios.
  - Added additional checks around the login service response - we don't need to parse it in case we get an HTTP error code (at least in this case, as it doesn't return any error messages). Added an error message in case we get a `401 Unauthorized` reponse. Added a generic error message for all other scenarios.
  - Added some basic styles to the login error message (colors, spacing, error states)

## Tabs

- Created a new route - `items/old`
- Created a new tab corresponding to the new route
- Created `itemHasOldPassword` function to verify if a given password is older than 30 days
- Created a list of old passwords under the new route/tab

## Page reloading

- There was a direct `window` call to redirect a page; I've removed it in favor of refetching the data from the server. Depending on the use case we could opt for updating only the item that changed without doing an API call. I had to do some prop drilling to extract the refresh function - in a more sophisticated scenario I would use something like `react-query` and invalidate the cache when you submit the change password form. Or if something simpler was required, I'd go for moving that state to context, but that would still result in hidden prop drilling anyway.

## Tests

- Added some additional combinations to `itemHasWeakPassword.test.ts`
- Modified `getUrl.test.ts` to better reflect the changes made in the project
- Upgraded & extended jest to for some more complex scenarios - eg. in `getUrl.test.ts` if we wanted to test multiple url params, their order shouldn't matter so there are multiple results that should be considered correct
- Added an additional check in `itemHasReusedPassword.test.ts` - if the password is reused, all items with that password should return `true`, but the code was checking only one of them
- Added new test suite - `itemHasOldPassword.test.ts`

## Code refactors / errors

- Missing key attribute in `/src/components/PasswordHealth/components/List/List.tsx` - needed by react to properly work with lists - https://reactjs.org/docs/lists-and-keys.html#keys
- Noticed some deprecation warnings in `/server/index.ts` regarding the body parser usage. Changed it to use the `express` variable instead as that seems to be the preferred way in newer versions of express. As `body-parser` package was no longer necessary I've removed it from the project.
- Fixed TS errors in `/server/endpoints/authentication.ts` - typeguard was missing around the `tokenOwner` variable as it could potentially be `undefined`.
- Added the missing `id` field definition in `/src/services/getUserItems.ts` as it is in the data, but the types for it were missing.
- Fixed TS issue in `/server/services/itemManager.ts` - the types for the `item` stuff were missing. Those are actually the same as the ones used on FE, so ideally types like these would be in some kind of a shared package used by both BE and FE. For now I've extracted it to a seperate TS file that's used on both.
- Added a favicon to the project, it's bad practice to leave that one out, the browser will constantly try to download it and throw 404 errors in the console.
- `react-modal` package wasn't used correctly as app element wasn't specified, which results in an accessibility issue - fixed by adding `Modal.setAppElement("#app")` function call - https://reactcommunity.org/react-modal/accessibility/ - also there's a seperate package for typescript types for it, so I've installed it - https://www.npmjs.com/package/@types/react-modal
- In case you reach a protected page (eg. `/items`) and your token is no longer valid, you'll get an ugly JSON parse error message. In such a case, I've added some code to remove the token and redirect the end user to the login page. It could be further improved depending on the use case - if we had a refresh token we could try regenerating it and retrying the request that failed, or redirect the end user to some intermediate page?
- Component typing - In some cases `React.FC` was used, in others there wasn't anything, and in some other place I saw untyped props as well. I've went through the app to standardize it a bit. I've opted out of using interfaces for component prop types as that implies a bit that they are extendable, while that wouldn't be a good idea. Also the usage of `React.FC` is debatable as well, as that includes types for props such as `children` property, while the component doesn't necessarily support those.
- Used `const` instead of `let` when appropriate. If we're not reassigning a `let` variable it's better to just use `const` instead, then you instantly know that it's not reassigned anyway when you look at its definition.
- Removed `LoadingScreen` component and replaced it with an overlay/loader combination. The way this component was used was causing unnecessary rerenders, as the browser had to redraw the whole interface when switching between loading/displaying data.
- Refactored filter tab counting - we don't need to do that on every render, only if the data changes. In this scenario it wasn't a bottleneck or anything like that, but in a more complex scenario it could be a thing. Also an item that appears in multiple tabs shouldn't be counted more than once, it's still a single vulnerable item, just with multiple vulnerabilities.
- The number of vulnerable passwords in the header didn't update after changing them. Fixed it by calculating how many password have at least one security issue.
- `String` and `string` usage - just settle on one, preferrably `string`.
- Extracted token key to a const variable
- A lot of smaller fixes related to linting. I've went through it using prettier auto formatting, so it might differ a bit than what was in there initially. Normally I'd include eslint/prettier configs for it in the project so every collaborator would use the same settings.
- `itemHasWeakPassword` function wasn't working correctly. It checked multiple requirements and counted how many of them were true, but instead of returning true for ones that adhere to those requirements (as the name implies), it was returning false. The test for it was failing as well. Fixed it.
- `/items` view shows all passwords, even if they don't have any vulnerabilities, while the app name ("Password Health") and the title in the header implies it displays all vulnerable passwords. Fixed it - I've filtered out passwords that don't have any vulnerabilities.
- Modified the update password handler - I'd say we shouldn't be able to change a vulnerable password into a vulnerable password - so it shouldn't be weak or reused (or the same as the old password, no point updating it then, as it would allow you to modify password creation date without changing it)
- Added a basic error boundary around the page to catch any non-handled errors and display a custom message

# Security issues

- `username` and `password` are sent to the server as plain text inside the url (using a HTTP GET request). These should be sent using a POST request as a payload to a server using https
- `token` is stored in `localstorage`. Ideally this should be in a place that isn't easily accessible by client side code - eg. HTTP only cookie?
- Passwords are stored as plain text (I treat arrays in `/server/data.ts` as a data store for the sake of this example). I'd consider using a hashing function combined with salt.
- I'd say we don't even need to fetch passwords on the FE - we could do all those checks on the backend and just fetch the results, as the end user doesn't even see the current passwords, they only see which ones are vulnerable.
- `itemHasWeakPassword` could be a bit more sophisticated:
  - Password being strong doesn't mean anything if there has been a data breach - there should be some kind of check for it (of course we shouldn't be sending the password anywhere)
  - A _strong_ password can still be prone to brute-force dictionary attacks, eg. I could create a password like this: "Xbox360"
- Passwords aren't assigned to users. If I were to create a new account, I would receive identical data from the server, as it only checks if my token is valid. So not only the token should be validated, but resources should be assigned to a user and only those should be returned. `getUserItems` was also taking an optional param `userId` - altough it wasn't supported on the server, we shouldn't be able to specify any random userId and try to get his data in the first place. To sum it up, we should only be able to get the data assigned to the logged in account.
