import axios, { AxiosError, AxiosResponse, AxiosStatic } from "axios";
import {
    ImagesSearchOptions,
    SearchImageResult,
    Image,
    Breed,
    Category
} from "./interfaces";
import { WhiskersError } from "./whiskersError";

/**
 * Client class for interacting with The Cat API.
 */
export class Client {
    private axios: AxiosStatic;
    static BASE_URL: string = "https://api.thecatapi.com/v1";

    /**
     * Creates a new instance of the Client class.
     * @param apiKey {string} - The API key for The Cat API.
     */
    constructor(apiKey: string) {
        this.axios = axios;
        axios.defaults.headers.common["x-api-key"] = apiKey;
        axios.defaults.baseURL = Client.BASE_URL;
        axios.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            async (error: AxiosError) => {
                return Promise.reject(new WhiskersError(error));
            }
        );
    }

    /**
     * Searches for cat images with the specified options.
     * @param params {ImagesSearchOptions} - The search options to apply.
     * @returns {Promise<SearchImageResult>} - A Promise that resolves to an array of cat images.
     */
    async getImages(params: ImagesSearchOptions): Promise<SearchImageResult> {
        const response: AxiosResponse<Array<Image>> = await this.axios.get(
            `${Client.BASE_URL}/images/search`,
            { params }
        );
        return {
            meta: {
                "pagination-count": Number(response.headers["pagination-count"]),
                "pagination-page": Number(response.headers["pagination-page"]),
                "pagination-limit": Number(response.headers["pagination-limit"])
            },
            data: response.data
        };
    }

    /**
     * Retrieves a cat image by its ID.
     * @param id {string} - The ID of the cat image.
     * @returns {Promise<Image | null>} - A Promise that resolves to a cat image. Null if not found.
     */
    async getImageById(id: string): Promise<Image | null> {
        try {
            const response: AxiosResponse<Image> = await this.axios.get(`/images/${id}`);
            return response.data;
        } catch (error) {
            // We will rethrow the error if its something like a rate limit cap.
            if ((error instanceof WhiskersError && error.status !== 400 || !(error instanceof WhiskersError))){
                throw error;
            }
        }
        return null;
    }

    /**
     * Searches for a cat breed by its name or ID with partial matching.
     * @param breedNameOrId {string} - The name or ID of the cat breed to search for.
     * @returns {Promise<Array<Breed>>} - A Promise that resolves to an array of cat breeds that match the search query.
     */
    async getBreed(breedNameOrId: string): Promise<Array<Breed>> {
        const breedParam = breedNameOrId.split(" ").join("%20");
        const response = await this.axios.get(`/breeds/search?q=${breedParam}`);
        return response.data;
    }

    /**
     * Retrieves all cat breeds.
     * @returns {Promise<Array<Breed>>} - A Promise that resolves to an array of cat breeds.
     */
    async getBreedList(): Promise<Array<Breed>> {
        const response: AxiosResponse<Array<Breed>> = await this.axios.get(`/breeds`);
        return response.data;
    }

    /**
     * Retrieve all image categories.
     * @returns {Promise<Array<Category>>} - A Promise that resolves to an array of categories.
     */
    async getCategoryList(): Promise<Array<Category>> {
        const response: AxiosResponse<Array<Category>> = await this.axios.get(`/categories`);
        return response.data;
    }
}
