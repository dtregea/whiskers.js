#  whiskers-js
This is an unofficial TypeScript-based API Wrapper for [The Cat API](https://thecatapi.com/). It allows you to easily interact with the API, providing methods to receive for cat images and information from The Cat API.

## Methods
- getImages
- getImageById
- getBreed
- getBreedList
- getCategoryList

##  Installation

You can install the package via npm:

`npm install whiskers-js`

##  Usage

First, you need to import the client class and instantiate it with your API key:
```
import { Client } from "whiskers-js";
const client = new Client("your-api-key");
```
###  Search for cat images
To search for cat images, use the `getImages` method. 
```
try {
	const image = await client.getImages({ limit: 1, order: "RANDOM" });
	console.log(image.data[0].url);
} catch (error) {
	console.error(error);
}
```
###  Retrieve a cat image by its ID
To get a cat image by its ID, use the `getImageById` method.
```
try {
	const image = await client.getImageById("image-id");
	console.log(image.url);
} catch (error) {
	console.error(error);
}
```
###  Search for a cat breed
To search for a cat breed by its name or ID, use the `getBreed` method.
```
try {
	const breed = await client.getBreed("breed-name-or-id");
	console.log(breed[0].description);
} catch (error) {
	console.error(error);
}
```
###  List all cat breeds
To get all cat breeds, use the `getBreedList` method.
```
try {
	const breedList = await client.getBreedList();
	breedList.forEach((breed) => console.log(breed.description))
} catch (error) {
	console.error(error);
}
```
##  Error Handling
This API wrapper throws an `WhiskersError` if there is an error response from The Cat API. This error object includes useful information about what went wrong. It contains the following properties:
-  `detail`: The body of the HTTP response.
-  `status`: The status code of the HTTP response.
-  `url`: The URL of the HTTP request.

Here is how you can catch and handle an `WhiskersError`:

```
import { WhiskersError } from "whiskers-js";
try {
	const image = await client.getBreedList();
} catch (err) {
	if (err instanceof WhiskersError && err.status === 429) {
		console.error('Rate Limit Reached!')
	}
}
```
##  Contributions
Contributions are always welcome! Please read the contribution guidelines first.
1.  **Fork and clone the repository**: You can keep your fork synced with the upstream repository by following these [instructions](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork).

2.  **Create a branch**: Make a branch for your changes. It's a good practice to create a new branch for each separate piece of work.

	`git checkout -b name-of-your-branch `

3.  **Make your changes**: Make your changes and commit them. Please make your commit messages informative.

	`git commit -m "commit message" `

4.  **Run the tests**: Ensure that your changes do not break any tests. If you're adding a new feature, please add tests for it.

5.  **Push your changes**: Push your changes to your forked repository.

	`git push origin name-of-your-branch `

6.  **Create a Pull Request**: Go to your forked repository on GitHub and click the "New Pull Request" button. Merge to the develop branch. Before your Pull Request can be merged, the following conditions must be met:

	- All tests must pass.

	- The change must be approved by a repository maintainer.
	
Thank you for your contributions!
##  License
This project is licensed under the MIT License.