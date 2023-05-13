#  whiskers-js
This is an unofficial TypeScript-based API Wrapper for [The Cat API](https://thecatapi.com/). It allows you to easily interact with the API, providing methods to receive for cat images and breed information.

##  Installation

You can install the package via npm:

`npm install whiskers-js`

Import the client class and instantiate it with your API key:
```
import { Client } from "whiskers-js";
const client = new Client("your-api-key");
```

## Methods
- getRandom
- searchImages
- getImageById
- getBreed
- getBreedList
- getCategoryList

##  Usage
###  Getting a random image
To get a random cat image or gif, use the `getRandom` method. 
```
const image = await client.getRandom();
console.log(image.url);
```
### Search Images with a Query
To search for cat images with specific query parameters, use the `searchImages` method.

Pagination requires a valid API key and has a maximum limit of 25 per page
```
// Retrieve the first 25 gifs 
const gifs = await client.searchImages({
    order: "ASC", 
    page: 1, 
    limit: 25, 
    mime_types: "gif"
});
gifs.data.forEach((gif) => console.log(gif.url));
```
The following attributes can be queried on. All are optional.
- size - The size of the images to search for. Can be 'small', 'med', or 'full'.
- mime_types - The available image types. Defaults to all types. Can be 'gif', 'jpg', 'png', or any combination of these.
- order - Order of results. Default is Random. Can be 'RANDOM', 'ASC', or 'DESC' If either ASC or DESC is passed then the Pagination headers will be on the response.
- page - The page number for results. Only used when order is ASC or DESC.
- limit - The maximum number of results to return. Default is 1. You can only pass 1 with an invalid API Key, with a valid key you can pass up to 25.
- category_ids - Comma delimited string of integers matching the id's of the Categories to filter the search. Category id's can found with getCategoryList().
- breed_ids - Comma delimited string of integers, matching the id's of the Breeds to filter the search. Breed id's can found with getBreedList().
- has_breeds - 0 or 1. Default is 0. Specifying 1 will only return images that have breed information. A valid API key is required to retrieve breed information on images.

###  Retrieve a cat image by its ID
To get a cat image by its ID, use the `getImageById` method.
```
const image = await client.getImageById("image-id");
if (image) {
	console.log(image.url);
}
```
###  Search for a cat breed
To search for a cat breed by its name or ID, use the `getBreed` method.
```
const breed = await client.getBreed("Sphynx");
console.log(breed[0].description);
```
Partial matching is used by the API thus multiple breeds can be returned.
###  List all cat breeds
To get all cat breeds, use the `getBreedList` method.
```
const breedList = await client.getBreedList();
breedList.forEach((breed) => console.log(breed.description))
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
	await client.getBreedList();
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

6.  **Create a Pull Request**: Go to your forked repository on GitHub and click the "New Pull Request" button. Merge to the `develop` branch. Before your Pull Request can be merged, the following conditions must be met:

	- All tests must pass.

	- The change must be approved by a repository maintainer.
	
Thank you for your contributions!
##  License
This project is licensed under the MIT License.